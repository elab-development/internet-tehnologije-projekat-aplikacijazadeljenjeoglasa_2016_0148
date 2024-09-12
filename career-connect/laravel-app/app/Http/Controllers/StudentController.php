<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Opening;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;
use Validator;

class StudentController extends Controller
{

    // Registracija studenta
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'faculty' => 'required|string',
            'study_program' => 'required|string',
            'graduation_year' => 'required|integer',
            'phone_number' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Student::create([
            'user_id' => $user->id,
            'faculty' => $request->faculty,
            'study_program' => $request->study_program,
            'graduation_year' => $request->graduation_year,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
        ]);

        return response()->json(['message' => 'Student registered successfully'], 201);
    }

    // Prikaz svih studenata koji moze da radi samo admin
    public function index()
    {
        // Provera da li je korisnik administrator
        if (!Auth::user() || !Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Uključivanje povezanog korisnika i vraćanje podataka
        $students = Student::with('user')->get();

        // Formatiranje rezultata
        $students = $students->map(function ($student) {
            return [
                'id' => $student->id,
                'user_id' => $student->user_id,
                'user_type' => 'student',
                'faculty' => $student->faculty,
                'study_program' => $student->study_program,
                'graduation_year' => $student->graduation_year,
                'name' => $student->user->name,
                'email' => $student->user->email,
            ];
        });

        return response()->json($students);
    }

    // Provera da li je korisnik student
    private function ensureStudent()
    {
        $student = Auth::user()->student;

        if (!$student) {
            return response()->json(['error' => 'Only students can perform this action.'], 403)->send();
        }

        return $student;
    }

    // Prijava na oglas ili provera da li je student prijavljen
    public function applyOrCheck(Request $request, $id)
    {
        $student = $this->ensureStudent();
        if ($student instanceof \Illuminate\Http\JsonResponse)
            return $student;

        $opening = Opening::findOrFail($id);

        // Provera da li student već ima prijavu na ovaj oglas
        $existingApplication = $student->applications()->where('opening_id', $id)->first();

        // Ako je GET metoda, proveri da li postoji prijava
        if ($request->isMethod('get')) {
            if ($existingApplication) {
                return response()->json(['status' => 'applied', 'message' => 'You have already applied for this job.']);
            } else {
                return response()->json(['status' => 'not_applied', 'message' => 'You have not applied for this job.']);
            }
        }

        // Ako je POST metoda i prijava već postoji
        if ($existingApplication) {
            return response()->json(['error' => 'You have already applied for this job.'], 400);
        }

        // Provera i upload CV fajla
        $cvPath = null;
        if ($request->hasFile('cv')) {
            $validator = Validator::make($request->all(), [
                'cv' => 'file|mimes:pdf|max:2048', // Maksimalno 2MB, podržani formati
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Sačuvaj CV fajl
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }

        // Prijava studenta na oglas
        Application::create([
            'student_id' => $student->id,
            'opening_id' => $opening->id,
            'cv_path' => $cvPath,
        ]);

        return response()->json(['message' => 'Application submitted successfully.']);
    }


    // Brisanje naloga
    // Brisanje naloga
    public function destroy($studentId = null)
    {
        $user = Auth::user();

        // Ako je student, briše svoj nalog
        if ($user->student && is_null($studentId)) {
            $student = $this->ensureStudent();
            if ($student instanceof \Illuminate\Http\JsonResponse)
                return $student;

            // Brisanje svih prijava pre brisanja studenta
            $student->applications()->delete();

            // Brisanje tokena


            $user = $student->user;
            $user->tokens()->delete();
            $student->delete();
            $user->delete();

            return response()->json(['message' => 'Profile and all related applications deleted successfully.']);
        }

        // Ako je admin, omogućava mu da obriše bilo kog studenta po ID-ju
        if ($user->admin && !is_null($studentId)) {
            $student = Student::find($studentId);
            if (!$student) {
                return response()->json(['error' => 'Student not found.'], 404);
            }

            // Brisanje svih prijava pre brisanja studenta
            $student->applications()->delete();

            // Brisanje tokena


            $user = $student->user;
            $user->tokens()->delete();
            $student->delete();
            $user->delete();

            return response()->json(['message' => 'Student profile and all related applications deleted successfully by admin.']);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
