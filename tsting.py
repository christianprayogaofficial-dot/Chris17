"""
=============================================================================
EDA (Exploratory Data Analysis) pada Dataset WINE
=============================================================================
Mata Kuliah   : Machine Learning Dasar
Topik         : Exploratory Data Analysis (EDA)
Dataset       : Wine - dimuat dari file CSV lokal.

Tujuan skrip:
    1. Menunjukkan alur EDA yang lengkap dan runtut: struktur data ->
       kualitas data -> statistik deskriptif -> distribusi univariat ->
       hubungan bivariat/multivariat -> deteksi outlier -> uji beda
       antar kelas -> ringkasan temuan.
    2. Menjadi CONTOH JAWABAN untuk soal latihan EDA (lihat dokumen
    dataset Wine. Mahasiswa diharapkan memodifikasi,
       bukan hanya menjalankan, skrip ini.
    3. Menghasilkan angka-angka yang dipakai sebagai contoh interpretasi
       pada bagian "Contoh Hasil Analisis" di dokumen pendamping.

Cara pakai (di Raspberry Pi ataupun laptop biasa):
    $ pip install pandas numpy matplotlib seaborn scipy
    $ python3 eda_wine.py

Semua grafik akan disimpan sebagai file .png di folder ./output_eda/
sehingga bisa dilihat kembali tanpa perlu menjalankan ulang skrip
(berguna terutama jika dijalankan headless di Raspberry Pi).
=============================================================================
"""

import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# -----------------------------------------------------------------------
# 0. KONFIGURASI UMUM
# -----------------------------------------------------------------------
OUTPUT_DIR = "output_eda"
os.makedirs(OUTPUT_DIR, exist_ok=True)

sns.set_theme(style="whitegrid")           # tema visual yang bersih untuk laporan
plt.rcParams["figure.dpi"] = 120
pd.set_option("display.width", 120)
pd.set_option("display.max_columns", 10)


def simpan_figure(fig, nama_file):
    """Simpan figure matplotlib ke OUTPUT_DIR dengan bounding box rapi."""
    path = os.path.join(OUTPUT_DIR, nama_file)
    fig.savefig(path, bbox_inches="tight")
    plt.close(fig)
    print(f"[Tersimpan] {path}")


def cetak_judul(judul):
    """Cetak header seksi agar output terminal mudah dibaca."""
    print("\n" + "=" * 78)
    print(judul)
    print("=" * 78)


# -----------------------------------------------------------------------
# 1. MEMUAT DATA & MENGENAL STRUKTURNYA
# -----------------------------------------------------------------------
cetak_judul("1. STRUKTUR DATA")

nama_kolom = [
    "class", "alcohol", "malic_acid", "ash", "alcalinity_of_ash",
    "magnesium", "total_phenols", "flavanoids",
    "nonflavanoid_phenols", "proanthocyanins", "color_intensity",
    "hue", "od280_od315", "proline",
]
df = pd.read_csv(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "wine.csv"),
    header=None,
    names=nama_kolom,
)
df["class"] = df["class"].astype(str)
fitur_numerik = nama_kolom[1:]
kolom_target = "class"

print(f"Jumlah baris (sampel)  : {df.shape[0]}")
print(f"Jumlah kolom (fitur)   : {df.shape[1]}")
print("\n5 baris pertama:")
print(df.head())

print("\nTipe data tiap kolom (df.info()):")
df.info()

# -----------------------------------------------------------------------
# 2. KUALITAS DATA: missing values, duplikat, konsistensi tipe
# -----------------------------------------------------------------------
cetak_judul("2. KUALITAS DATA")

missing = df.isnull().sum()
print("Jumlah nilai kosong (missing values) per kolom:")
print(missing)

n_duplikat = df.duplicated().sum()
print(f"\nJumlah baris duplikat: {n_duplikat}")

print(f"\nDistribusi kelas target ({kolom_target}):")
print(df[kolom_target].value_counts().sort_index())
print("\nProporsi kelas target (untuk memeriksa apakah data seimbang):")
print(df[kolom_target].value_counts(normalize=True).sort_index().round(3))

# -----------------------------------------------------------------------
# 3. STATISTIK DESKRIPTIF
# -----------------------------------------------------------------------
cetak_judul("3. STATISTIK DESKRIPTIF (seluruh data)")

deskripsi_keseluruhan = df[fitur_numerik].describe().T
deskripsi_keseluruhan["skewness"] = df[fitur_numerik].skew()
deskripsi_keseluruhan["kurtosis"] = df[fitur_numerik].kurt()
print(deskripsi_keseluruhan.round(3))

cetak_judul("3b. STATISTIK DESKRIPTIF PER KELAS (df.groupby)")
deskripsi_per_kelas = df.groupby(kolom_target, observed=True)[fitur_numerik].agg(["mean", "std"])
print(deskripsi_per_kelas.round(3))

# -----------------------------------------------------------------------
# 4. ANALISIS UNIVARIAT: histogram & boxplot tiap fitur
# -----------------------------------------------------------------------
cetak_judul("4. ANALISIS UNIVARIAT")

jumlah_kolom_grafik = 4
jumlah_baris_grafik = int(np.ceil(len(fitur_numerik) / jumlah_kolom_grafik))
fig, axes = plt.subplots(jumlah_baris_grafik, jumlah_kolom_grafik,
                         figsize=(16, 4 * jumlah_baris_grafik))
for ax, fitur in zip(axes.flatten(), fitur_numerik):
    sns.histplot(data=df, x=fitur, hue=kolom_target, kde=True, ax=ax, element="step")
    ax.set_title(f"Distribusi {fitur}")
for ax in axes.flatten()[len(fitur_numerik):]:
    ax.set_visible(False)
fig.suptitle("Histogram Setiap Fitur, Dipisah per Spesies", y=1.02, fontsize=13)
fig.tight_layout()
simpan_figure(fig, "01_histogram_per_fitur.png")

fig, axes = plt.subplots(jumlah_baris_grafik, jumlah_kolom_grafik,
                         figsize=(16, 4 * jumlah_baris_grafik))
for ax, fitur in zip(axes.flatten(), fitur_numerik):
    sns.boxplot(data=df, x=kolom_target, y=fitur, ax=ax, hue=kolom_target, legend=False)
    ax.set_title(f"Boxplot {fitur} per Kelas")
for ax in axes.flatten()[len(fitur_numerik):]:
    ax.set_visible(False)
fig.tight_layout()
simpan_figure(fig, "02_boxplot_per_fitur.png")

# -----------------------------------------------------------------------
# 5. ANALISIS BIVARIAT / MULTIVARIAT
# -----------------------------------------------------------------------
cetak_judul("5. ANALISIS BIVARIAT / MULTIVARIAT")

matriks_korelasi = df[fitur_numerik].corr(method="pearson")
print("Matriks korelasi Pearson antar fitur numerik:")
print(matriks_korelasi.round(3))

fig, ax = plt.subplots(figsize=(6, 5))
sns.heatmap(matriks_korelasi, annot=True, fmt=".2f", cmap="coolwarm",
            vmin=-1, vmax=1, square=True, ax=ax)
ax.set_title("Heatmap Korelasi Antar Fitur")
simpan_figure(fig, "03_heatmap_korelasi.png")

fitur_pairplot = fitur_numerik[:4]
pairplot = sns.pairplot(df, vars=fitur_pairplot, hue=kolom_target,
                        diag_kind="kde", corner=True)
pairplot.fig.suptitle("Pairplot Seluruh Fitur, Dipisah per Spesies", y=1.02)
pairplot.savefig(os.path.join(OUTPUT_DIR, "04_pairplot.png"), bbox_inches="tight")
plt.close(pairplot.fig)
print(f"[Tersimpan] {os.path.join(OUTPUT_DIR, '04_pairplot.png')}")

# -----------------------------------------------------------------------
# 6. DETEKSI OUTLIER (metode IQR)
# -----------------------------------------------------------------------
cetak_judul("6. DETEKSI OUTLIER (metode IQR)")


def deteksi_outlier_iqr(kolom):
    """Kembalikan jumlah dan indeks outlier suatu kolom memakai aturan 1.5*IQR."""
    q1, q3 = kolom.quantile([0.25, 0.75])
    iqr = q3 - q1
    batas_bawah, batas_atas = q1 - 1.5 * iqr, q3 + 1.5 * iqr
    mask = (kolom < batas_bawah) | (kolom > batas_atas)
    return mask.sum(), batas_bawah, batas_atas


for fitur in fitur_numerik:
    jumlah, lo, hi = deteksi_outlier_iqr(df[fitur])
    print(f"{fitur:15s}: {jumlah} outlier  (batas normal: [{lo:.2f}, {hi:.2f}])")

# -----------------------------------------------------------------------
# 7. UJI STATISTIK: apakah rata-rata fitur berbeda signifikan antar spesies?
#    (memperkuat interpretasi visual dengan angka p-value, ANOVA satu arah)
# -----------------------------------------------------------------------
cetak_judul("7. UJI ANOVA SATU ARAH PER FITUR (H0: rata-rata sama di 3 spesies)")

for fitur in fitur_numerik:
    kelompok = [grup[fitur].values for _, grup in df.groupby(kolom_target, observed=True)]
    f_stat, p_value = stats.f_oneway(*kelompok)
    kesimpulan = "TOLAK H0 (berbeda signifikan)" if p_value < 0.05 else "GAGAL TOLAK H0"
    print(f"{fitur:15s}: F = {f_stat:8.2f}   p-value = {p_value:.3e}   -> {kesimpulan}")

# -----------------------------------------------------------------------
# 8. RINGKASAN TEMUAN (dicetak otomatis, dipakai sebagai draf laporan)
# -----------------------------------------------------------------------
cetak_judul("8. RINGKASAN TEMUAN EDA (draf otomatis)")

fitur_korelasi_tertinggi = (
    matriks_korelasi.where(~np.eye(len(matriks_korelasi), dtype=bool))
    .abs().stack().idxmax()
)
nilai_korelasi_tertinggi = matriks_korelasi.loc[fitur_korelasi_tertinggi]

status_duplikat = (
    f"ditemukan {n_duplikat} baris duplikat (perlu diputuskan apakah akan "
    f"dibuang tergantung tujuan analisis)" if n_duplikat > 0
    else "tidak ditemukan baris duplikat"
)

print(f"""
1. Dataset berisi {df.shape[0]} sampel, {len(fitur_numerik)} fitur numerik,
    dan 1 target kategorikal ({kolom_target}) dengan
    {df[kolom_target].nunique()} kelas.
2. Tidak ada missing values pada seluruh kolom, namun {status_duplikat}
   -> data hampir siap pakai, hanya perlu pengecekan duplikat tersebut.
3. Pasangan fitur dengan korelasi absolut tertinggi adalah
   {fitur_korelasi_tertinggi[0]} & {fitur_korelasi_tertinggi[1]}
   (r = {nilai_korelasi_tertinggi:.3f}).
4. Fitur dengan perbedaan rata-rata kelas yang perlu diperhatikan dapat
    dilihat pada tabel statistik per kelas dan hasil ANOVA di atas.
5. Grafik histogram, boxplot, korelasi, dan pairplot membantu melihat
    pola distribusi serta pemisahan antar kelas Wine.
6. Deteksi outlier dengan aturan 1.5*IQR ditampilkan pada bagian 6.
""")

print("Selesai. Seluruh grafik tersimpan di folder:", os.path.abspath(OUTPUT_DIR))
