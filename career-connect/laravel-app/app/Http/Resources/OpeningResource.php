<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OpeningResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = "opening";
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'employment_type' => $this->employment_type,
            'work_mode' => $this->work_mode,
            'posted_at' => $this->posted_at,
            'expires_at' => $this->expires_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'company' => $this->company ? $this->company->user->name : null,
        ];
    }
}
