<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItemsSparepartModel;
use Illuminate\Http\Request;

class ItemsSparepartController extends Controller
{
    /**
     * List Data
     */
    public function index(Request $request)
    {
        try {

            $search = $request->search;
            $limit  = $request->limit ?? 10;

            $query = ItemsSparepartModel::query();

            if (!empty($search)) {

                $query->where(function ($q) use ($search) {

                    $q->where(
                        'part_code',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'part_name',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'part_number',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'notes',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'minimum_stock',
                        'like',
                        "%{$search}%"
                    );
                });
            }

            $data = $query
                ->orderBy('id', 'desc')
                ->paginate($limit);

            return response()->json([
                'success' => true,
                'data' => $data->items(),
                'meta' => [
                    'current_page' => $data->currentPage(),
                    'last_page'    => $data->lastPage(),
                    'per_page'     => $data->perPage(),
                    'total'        => $data->total(),
                ]
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }
    }

    /**
     * Detail Data
     */
    public function show($id)
    {
        try {

            $data = ItemsSparepartModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            return response()->json([
                'success' => true,
                'data'    => $data,
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * Simpan Data
     */
    public function store(Request $request)
    {
        try {

            $validated = $request->validate([
                'category_id'   => 'required|max:255',
                'part_code'     => 'required|max:255|unique:m_maintenance_spareparts,part_code',
                'part_name'     => 'required|max:255',
                'part_number'   => 'nullable|max:255',
                'unit'          => 'nullable|max:255',
                'notes'         => 'nullable|max:255',
                'minimum_stock' => 'nullable|integer|min:0',
            ]);

            $data = ItemsSparepartModel::insert([
                'category_id'   => trim($validated['category_id']),
                'part_code'     => trim($validated['part_code']),
                'part_name'     => trim($validated['part_name']),
                'part_number'   => trim($validated['part_number']),
                'unit'          => trim($validated['unit']),
                'notes'         => trim($validated['notes']),
                'minimum_stock' => $validated['minimum_stock'],
                'status'        => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil ditambahkan',
                'data'    => $data,
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * Update Data
     */
    public function update(Request $request, $id)
    {
        try {
            $data = ItemsSparepartModel::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // 2. Validasi input
            $validated = $request->validate([
                'category_id'   => 'required|max:255',
                'part_code'     => 'required|max:255|unique:m_maintenance_spareparts,part_code,' . $id,
                'part_name'     => 'required|max:255',
                'part_number'   => 'nullable|max:255',
                'unit'          => 'nullable|max:255',
                'notes'         => 'nullable|max:255',
                'minimum_stock' => 'nullable|integer|min:0',
            ]);

            // Sesuaikan key array dengan nama kolom di database Anda
            $update = ItemsSparepartModel::where('id', $id)->update([
                'category_id'   => trim($validated['category_id']),
                'part_code'     => trim($validated['part_code']),
                'part_name'     => trim($validated['part_name']),
                'part_number'   => trim($validated['part_number']),
                'unit'          => trim($validated['unit']),
                'notes'         => trim($validated['notes']),
                'minimum_stock' => $validated['minimum_stock'],
                'status'        => $request->status ?? $data->status,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diperbarui',
                'data'    => $data->fresh(),
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Menangani error validasi secara spesifik
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus Data
     */
    public function destroy($id)
    {
        try {

            $data = ItemsSparepartModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            // hapus data
            ItemsSparepartModel::where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil dihapus',
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);

        }
    }
}