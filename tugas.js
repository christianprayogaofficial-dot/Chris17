// ==========================================
// TUGAS JAVASCRIPT - PROFIL
// ==========================================

// Menunggu seluruh HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // MEMBUAT BAGIAN FORM DENGAN DOM
    // ==========================================

    const section = document.createElement("section");

    const judul = document.createElement("h2");
    judul.textContent = "Form Input Data";

    section.appendChild(judul);

    // ==========================================
    // 1. INPUT TEKS
    // ==========================================

    const labelNama = document.createElement("label");
    labelNama.textContent = "Masukkan nama: ";

    const inputNama = document.createElement("input");
    inputNama.type = "text";
    inputNama.id = "inputNama";
    inputNama.placeholder = "Masukkan nama";

    section.appendChild(labelNama);
    section.appendChild(inputNama);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // 2. INPUT JUMLAH PILIHAN (NUMBER/SPINNER)
    // ==========================================

    const labelJumlah = document.createElement("label");
    labelJumlah.textContent = "Jumlah pilihan: ";

    const inputJumlah = document.createElement("input");
    inputJumlah.type = "number";
    inputJumlah.id = "inputJumlah";
    inputJumlah.min = "1";
    inputJumlah.max = "10";
    inputJumlah.value = "3";

    section.appendChild(labelJumlah);
    section.appendChild(inputJumlah);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // 3. INPUT EMAIL
    // ==========================================

    const labelEmail = document.createElement("label");
    labelEmail.textContent = "Masukkan email: ";

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.id = "inputEmail";
    inputEmail.placeholder = "contoh@email.com";

    section.appendChild(labelEmail);
    section.appendChild(inputEmail);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // TOMBOL BUAT PILIHAN
    // ==========================================

    const tombolBuat = document.createElement("button");
    tombolBuat.textContent = "Buat Pilihan";
    tombolBuat.type = "button";

    section.appendChild(tombolBuat);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // CONTAINER PILIHAN
    // ==========================================

    const containerPilihan = document.createElement("div");
    containerPilihan.id = "containerPilihan";

    section.appendChild(containerPilihan);


    // ==========================================
    // OUTPUT DOM
    // ==========================================

    const output = document.createElement("div");
    output.id = "output";

    section.appendChild(output);


    // Memasukkan section ke dalam body
    document.body.appendChild(section);


    // ==========================================
    // ARRAY UNTUK MENYIMPAN PILIHAN
    // ==========================================

    const pilihanCheckbox = [
        "Bermain Game",
        "Mendengarkan Musik",
        "Olahraga",
        "Membaca"
    ];

    const pilihanDropdown = [
        "Informatika",
        "Sistem Informasi",
        "Teknik Komputer",
        "Teknik Elektro"
    ];

    const pilihanRadio = [
        "Laki-laki",
        "Perempuan"
    ];


    // ==========================================
    // EVENT TOMBOL
    // ==========================================

    tombolBuat.addEventListener("click", function () {

        // ------------------------------------------
        // VALIDASI INPUT NAMA
        // ------------------------------------------

        const nama = inputNama.value.trim();

        if (nama === "") {
            alert("Nama tidak boleh kosong!");
            inputNama.focus();
            return;
        }


        // ------------------------------------------
        // VALIDASI JUMLAH PILIHAN
        // ------------------------------------------

        const jumlah = Number(inputJumlah.value);

        if (
            inputJumlah.value === "" ||
            isNaN(jumlah) ||
            jumlah < 1 ||
            jumlah > 10
        ) {
            alert("Jumlah pilihan harus antara 1 sampai 10!");
            inputJumlah.focus();
            return;
        }


        // ------------------------------------------
        // VALIDASI EMAIL DENGAN PATTERN
        // ------------------------------------------

        const email = inputEmail.value.trim();

        const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!polaEmail.test(email)) {
            alert("Format email tidak valid! Silakan masukkan email yang benar.");
            inputEmail.value = "";
            inputEmail.focus();
            return;
        }


        // ------------------------------------------
        // MEMBERSIHKAN PILIHAN SEBELUMNYA
        // ------------------------------------------

        containerPilihan.innerHTML = "";

        output.innerHTML = "";


        // ==========================================
        // CHECKBOX
        // DIBUAT MENGGUNAKAN LOOP
        // ==========================================

        const judulCheckbox = document.createElement("h3");
        judulCheckbox.textContent = "Pilih Hobi:";

        containerPilihan.appendChild(judulCheckbox);

        for (let i = 0; i < pilihanCheckbox.length; i++) {

            const divCheckbox = document.createElement("div");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "hobi";
            checkbox.value = pilihanCheckbox[i];
            checkbox.id = "checkbox" + i;

            const labelCheckbox = document.createElement("label");
            labelCheckbox.htmlFor = "checkbox" + i;
            labelCheckbox.textContent = pilihanCheckbox[i];

            divCheckbox.appendChild(checkbox);
            divCheckbox.appendChild(labelCheckbox);

            containerPilihan.appendChild(divCheckbox);
        }


        // ==========================================
        // DROPDOWN
        // DIBUAT MENGGUNAKAN LOOP
        // ==========================================

        const judulDropdown = document.createElement("h3");
        judulDropdown.textContent = "Pilih Program Studi:";

        containerPilihan.appendChild(judulDropdown);

        const selectProdi = document.createElement("select");
        selectProdi.id = "selectProdi";

        const optionAwal = document.createElement("option");
        optionAwal.value = "";
        optionAwal.textContent = "-- Pilih Prodi --";

        selectProdi.appendChild(optionAwal);

        for (let i = 0; i < pilihanDropdown.length; i++) {

            const option = document.createElement("option");

            option.value = pilihanDropdown[i];
            option.textContent = pilihanDropdown[i];

            selectProdi.appendChild(option);
        }

        containerPilihan.appendChild(selectProdi);


        // ==========================================
        // RADIO BUTTON
        // DIBUAT MENGGUNAKAN LOOP
        // ==========================================

        const judulRadio = document.createElement("h3");
        judulRadio.textContent = "Pilih Jenis Kelamin:";

        containerPilihan.appendChild(judulRadio);

        for (let i = 0; i < pilihanRadio.length; i++) {

            const divRadio = document.createElement("div");

            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = "jenisKelamin";
            radio.value = pilihanRadio[i];
            radio.id = "radio" + i;

            const labelRadio = document.createElement("label");

            labelRadio.htmlFor = "radio" + i;
            labelRadio.textContent = pilihanRadio[i];

            divRadio.appendChild(radio);
            divRadio.appendChild(labelRadio);

            containerPilihan.appendChild(divRadio);
        }


        // ==========================================
        // TOMBOL TAMPILKAN HASIL
        // ==========================================

        const tombolHasil = document.createElement("button");

        tombolHasil.textContent = "Tampilkan Hasil";
        tombolHasil.type = "button";

        containerPilihan.appendChild(document.createElement("br"));
        containerPilihan.appendChild(tombolHasil);


        // ==========================================
        // EVENT TOMBOL HASIL
        // ==========================================

        tombolHasil.addEventListener("click", function () {

            // --------------------------------------
            // ARRAY HASIL CHECKBOX
            // --------------------------------------

            const checkboxTerpilih = [];

            const semuaCheckbox =
                document.querySelectorAll('input[name="hobi"]');

            semuaCheckbox.forEach(function (checkbox) {

                if (checkbox.checked) {
                    checkboxTerpilih.push(checkbox.value);
                }

            });


            // --------------------------------------
            // HASIL DROPDOWN
            // --------------------------------------

            const prodi =
                document.getElementById("selectProdi").value;


            // --------------------------------------
            // HASIL RADIO BUTTON
            // --------------------------------------

            const radioTerpilih =
                document.querySelector('input[name="jenisKelamin"]:checked');

            let jenisKelamin = "";

            if (radioTerpilih !== null) {
                jenisKelamin = radioTerpilih.value;
            }


            // --------------------------------------
            // VALIDASI PILIHAN
            // --------------------------------------

            if (checkboxTerpilih.length === 0) {
                alert("Silakan pilih minimal satu hobi!");
                return;
            }

            if (prodi === "") {
                alert("Silakan pilih program studi!");
                return;
            }

            if (jenisKelamin === "") {
                alert("Silakan pilih jenis kelamin!");
                return;
            }


            // ======================================
            // OUTPUT MENGGUNAKAN JAVASCRIPT DOM
            // ======================================

            const judulOutput = document.createElement("h2");
            judulOutput.textContent = "Hasil Input";

            const hasilNama = document.createElement("p");
            hasilNama.innerHTML = "<b>Nama:</b> " + nama;

            const hasilEmail = document.createElement("p");
            hasilEmail.innerHTML = "<b>Email:</b> " + email;

            const hasilProdi = document.createElement("p");
            hasilProdi.innerHTML = "<b>Program Studi:</b> " + prodi;

            const hasilGender = document.createElement("p");
            hasilGender.innerHTML =
                "<b>Jenis Kelamin:</b> " + jenisKelamin;

            const hasilHobi = document.createElement("p");

            hasilHobi.innerHTML =
                "<b>Hobi:</b> " + checkboxTerpilih.join(", ");


            // Membersihkan output sebelumnya
            output.innerHTML = "";

            // Menampilkan hasil
            output.appendChild(judulOutput);
            output.appendChild(hasilNama);
            output.appendChild(hasilEmail);
            output.appendChild(hasilProdi);
            output.appendChild(hasilGender);
            output.appendChild(hasilHobi);
        });
    });
});