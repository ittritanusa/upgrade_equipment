<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KendaraanModel;
use Illuminate\Http\Request;

class KendaraanController extends Controller
{
    /**
     * List Data
     */
    public function index(Request $request)
    {
        try {
            $search = $request->search;
            $limit  = $request->limit ?? 10;

            $query = KendaraanModel::with(['unitKendaraan', 'tipeKendaraan', 'merkKendaraan']);

            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->where('NoPolisi', 'like', "%{$search}%")
                    ->orWhere('UnitBisnis', 'like', "%{$search}%")
                    ->orWhereHas('unitKendaraan', function ($qUnit) use ($search) {
                        $qUnit->where('Unit', 'like', "%{$search}%");
                    })
                    ->orWhereHas('tipeKendaraan', function ($qTipe) use ($search) {
                        $qTipe->where('Type', 'like', "%{$search}%");
                    });
                });
            }

            $data = $query->orderBy('id', 'desc')->paginate($limit);

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
            // Menggunakan with untuk eager loading relasi dan langsung mencari berdasarkan ID
            $data = KendaraanModel::with(['unitKendaraan', 'tipeKendaraan', 'merkKendaraan'])
                ->find($id);

            // Jika data tidak ditemukan, kembalikan response 404
            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // Jika ditemukan, kembalikan data tersebut
            return response()->json([
                'success' => true,
                'data'    => $data,
            ], 200);

        } catch (\Throwable $e) {
            // Penanganan error jika terjadi masalah pada server/database
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server: ' . $e->getMessage(),
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
                'NoPolisi'  => 'required|max:255',
                'TypeUnit'  => 'required|max:255',
            ]);

            $data = KendaraanModel::insert($request->all());

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
            $data = KendaraanModel::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // 1. Validasi input
            $validated = $request->validate([
                'TypeUnit'         => 'required|string|max:255',
                'NoPolisi'         => 'required|string|max:50',
                'NoMesin'          => 'required|string|max:255',
                'NoRangka'         => 'required|string|max:255',
                'NoLambung'        => 'required|string|max:255',
                'NoBPKB'           => 'required|string|max:255',
                'StatusUnit'       => 'required|integer',
                'BahanBakar'       => 'required|string|max:100',
                'Asuransi'         => 'nullable|string|max:255',
                'TypeKendaraan'    => 'required|string|max:255',
                'MerekTypeUnit'    => 'required|string|max:255',
                'Milik'            => 'required|string|max:255',
                'WarnaKB'          => 'required|string|max:50',
                'WarnaTNKB'        => 'required|string|max:50',
                'PengesahanSTNK'   => 'nullable|date',
                'ExpiredSTNK'      => 'nullable|date',
                'PengesahanTAX'    => 'nullable|date',
                'ExpiredTAX'       => 'nullable|date',
                'NoKIR'            => 'nullable|string|max:100',
                'PengesahanKIR'    => 'nullable|date',
                'ExpiredKIR'       => 'nullable|date',
                'NoKIR2'           => 'nullable|string|max:100',
                'PengesahanKIR2'   => 'nullable|date',
                'ExpiredKIR2'      => 'nullable|date',
                'LokasiUnit'       => 'required|string|max:255',
                'UnitBisnis'       => 'required|string|max:255',
                'TahunPembuatan'   => 'nullable|date',
                'KeteranganStatus' => 'nullable|string',
            ]);

            // 2. Update dengan mapping manual agar aman & bisa di-trim
            $update = KendaraanModel::where('id', $id)->update([
                'TypeUnit'         => trim($validated['TypeUnit']),
                'NoPolisi'         => trim($validated['NoPolisi']),
                'NoMesin'          => trim($validated['NoMesin']),
                'NoRangka'         => trim($validated['NoRangka']),
                'NoLambung'        => trim($validated['NoLambung']),
                'NoBPKB'           => trim($validated['NoBPKB']),
                'StatusUnit'       => $validated['StatusUnit'],
                'BahanBakar'       => trim($validated['BahanBakar']),
                'Asuransi'         => $validated['Asuransi'] ? trim($validated['Asuransi']) : null,
                'TypeKendaraan'    => trim($validated['TypeKendaraan']),
                'MerekTypeUnit'    => trim($validated['MerekTypeUnit']),
                'Milik'            => trim($validated['Milik']),
                'WarnaKB'          => trim($validated['WarnaKB']),
                'WarnaTNKB'        => trim($validated['WarnaTNKB']),
                'PengesahanSTNK'   => $validated['PengesahanSTNK'],
                'ExpiredSTNK'      => $validated['ExpiredSTNK'],
                'PengesahanTAX'    => $validated['PengesahanTAX'],
                'ExpiredTAX'       => $validated['ExpiredTAX'],
                'NoKIR'            => $validated['NoKIR'] ? trim($validated['NoKIR']) : null,
                'PengesahanKIR'    => $validated['PengesahanKIR'],
                'ExpiredKIR'       => $validated['ExpiredKIR'],
                'NoKIR2'           => $validated['NoKIR2'] ? trim($validated['NoKIR2']) : null,
                'PengesahanKIR2'   => $validated['PengesahanKIR2'],
                'ExpiredKIR2'      => $validated['ExpiredKIR2'],
                'LokasiUnit'       => trim($validated['LokasiUnit']),
                'UnitBisnis'       => trim($validated['UnitBisnis']),
                'TahunPembuatan'   => $validated['TahunPembuatan'],
                'KeteranganStatus' => $validated['KeteranganStatus'] ? trim($validated['KeteranganStatus']) : null,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diperbarui',
                'data'    => $data->fresh(),
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
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

            $data = KendaraanModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            // hapus data
            KendaraanModel::where('id', $id)->delete();

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