<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnitKendaraanModel;
use Illuminate\Http\Request;

class UnitKendaraanController extends Controller
{
    /**
     * List Data
     */
    public function index()
    {
        try {

            $data = UnitKendaraanModel::orderBy(
                'Kode',
                'asc'
            )->get();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
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
     * Detail Data
     */
    public function show($id)
    {
        try {

            $data = UnitKendaraanModel::find($id);

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
                'Kode' => 'required|max:50|unique:m_unit_kendaraan,Kode',
                'Unit' => 'required|max:255',
            ]);

            $data = UnitKendaraanModel::insert([
                'Kode' => trim($validated['Kode']),
                'Unit' => trim($validated['Unit']),
                'status'    => 1,
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
            $data = UnitKendaraanModel::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // 2. Validasi input
            $validated = $request->validate([
                'Kode' => 'required|max:50|unique:m_unit_kendaraan,Kode,' . $id . ',id',
                'Unit' => 'required|max:255',
                'Status'    => 'required|integer|in:1,2',
            ]);

            // Sesuaikan key array dengan nama kolom di database Anda
            $update = UnitKendaraanModel::where('id', $id)->update([
                'Kode'   => trim($validated['Kode']),
                'Unit'   => trim($validated['Unit']),
                'Status' => $validated['Status'],
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

            $data = UnitKendaraanModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            // hapus data
            UnitKendaraanModel::where('id', $id)->delete();

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