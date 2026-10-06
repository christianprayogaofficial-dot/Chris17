// ==========================================
// TUGAS JAVASCRIPT - FORM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // MEMBUAT SECTION FORM
    // ==========================================

    const section = document.createElement("section");

    const judul = document.createElement("h2");
    judul.textContent = "Tugas Form";

    section.appendChild(judul);


    // ==========================================
    // JUDUL FORM
    // ==========================================

    const judulForm = document.createElement("h2");
    judulForm.textContent = "Pilih Hobi yang Kamu Sukai";

    section.appendChild(judulForm);


    // ==========================================
    // INPUT NAMA DEPAN
    // ==========================================

    const labelNamaDepan = document.createElement("label");
    labelNamaDepan.textContent = "Nama Depan:";

    section.appendChild(labelNamaDepan);
    section.appendChild(document.createElement("br"));

    const inputNamaDepan = document.createElement("input");
    inputNamaDepan.type = "text";
    inputNamaDepan.id = "namaDepan";

    section.appendChild(inputNamaDepan);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // INPUT NAMA BELAKANG
    // ==========================================

    const labelNamaBelakang = document.createElement("label");
    labelNamaBelakang.textContent = "Nama Belakang:";

    section.appendChild(labelNamaBelakang);
    section.appendChild(document.createElement("br"));

    const inputNamaBelakang = document.createElement("input");
    inputNamaBelakang.type = "text";
    inputNamaBelakang.id = "namaBelakang";

    section.appendChild(inputNamaBelakang);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // INPUT EMAIL
    // ==========================================

    const labelEmail = document.createElement("label");
    labelEmail.textContent = "Email:";

    section.appendChild(labelEmail);
    section.appendChild(document.createElement("br"));

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.id = "email";
    inputEmail.placeholder = "contoh@email.com";

    section.appendChild(inputEmail);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // INPUT JUMLAH PILIHAN HOBI
    // ==========================================

    const labelJumlah = document.createElement("label");
    labelJumlah.textContent = "Jumlah Pilihan Hobi:";

    section.appendChild(labelJumlah);
    section.appendChild(document.createElement("br"));

    const inputJumlah = document.createElement("input");
    inputJumlah.type = "number";
    inputJumlah.id = "jumlahHobi";
    inputJumlah.min = "1";
    inputJumlah.max = "10";
    inputJumlah.value = "3";

    section.appendChild(inputJumlah);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // TOMBOL SUBMIT
    // ==========================================

    const tombolSubmit = document.createElement("button");
    tombolSubmit.textContent = "Submit";
    tombolSubmit.type = "button";

    section.appendChild(tombolSubmit);

    section.appendChild(document.createElement("br"));
    section.appendChild(document.createElement("br"));


    // ==========================================
    // CONTAINER PILIHAN
    // ==========================================

    const containerPilihan = document.createElement("div");
    containerPilihan.id = "containerPilihan";

    section.appendChild(containerPilihan);


    // ==========================================
    // OUTPUT
    // ==========================================

    const output = document.createElement("div");
    output.id = "output";

    section.appendChild(output);


    // ==========================================
    // MEMASUKKAN FORM KE BODY
    // ==========================================

    document.body.appendChild(section);


    // ==========================================
    // ARRAY PILIHAN
    // ==========================================

    const pilihanCheckbox = [
        "Tidur",
        "Makan",
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
    // EVENT SUBMIT
    // ==========================================

    tombolSubmit.addEventListener("click", function () {

        // ==========================================
        // MENGAMBIL INPUT USER
        // ==========================================

        const namaDepan = inputNamaDepan.value.trim();
        const namaBelakang = inputNamaBelakang.value.trim();
        const email = inputEmail.value.trim();
        const jumlah = Number(inputJumlah.value);


        // ==========================================
        // VALIDASI
        // ==========================================

        if (namaDepan === "") {
            alert("Nama depan harus diisi!");
            inputNamaDepan.focus();
            return;
        }

        if (namaBelakang === "") {
            alert("Nama belakang harus diisi!");
            inputNamaBelakang.focus();
            return;
        }

        if (email === "") {
            alert("Email harus diisi!");
            inputEmail.focus();
            return;
        }

        if (inputJumlah.value === "" || jumlah < 1 || jumlah > 10) {
            alert("Jumlah pilihan harus antara 1 sampai 10!");
            inputJumlah.focus();
            return;
        }


        // ==========================================
        // MEMBERSIHKAN PILIHAN LAMA
        // ==========================================

        containerPilihan.innerHTML = "";
        output.innerHTML = "";


        // ==========================================
        // JUDUL MASUKKAN PILIHAN
        // ==========================================

        const judulPilihan = document.createElement("h2");
        judulPilihan.textContent = "Masukkan Pilihan";

        containerPilihan.appendChild(judulPilihan);


        // ==========================================
        // MEMBUAT INPUT PILIHAN SESUAI JUMLAH
        // ==========================================

        for (let i = 0; i < jumlah; i++) {

            const labelPilihan = document.createElement("label");

            labelPilihan.textContent = "Pilihan " + (i + 1) + ":";

            containerPilihan.appendChild(labelPilihan);
            containerPilihan.appendChild(document.createElement("br"));


            const inputPilihan = document.createElement("input");

            inputPilihan.type = "text";
            inputPilihan.id = "pilihan" + i;
            inputPilihan.placeholder = "Masukkan pilihan";


            containerPilihan.appendChild(inputPilihan);

            containerPilihan.appendChild(document.createElement("br"));
            containerPilihan.appendChild(document.createElement("br"));
        }


        // ==========================================
        // TOMBOL BUAT PILIHAN
        // ==========================================

        const tombolBuatPilihan = document.createElement("button");

        tombolBuatPilihan.textContent = "Buat Pilihan";
        tombolBuatPilihan.type = "button";

        containerPilihan.appendChild(tombolBuatPilihan);


        // ==========================================
        // EVENT BUAT PILIHAN
        // ==========================================

        tombolBuatPilihan.addEventListener("click", function () {

            // ==========================================
            // ARRAY UNTUK MENYIMPAN INPUT USER
            // ==========================================

            const arrayPilihan = [];


            // ==========================================
            // MENGAMBIL SETIAP INPUT
            // ==========================================

            for (let i = 0; i < jumlah; i++) {

                const nilai = document.getElementById(
                    "pilihan" + i
                ).value.trim();


                if (nilai === "") {
                    alert("Pilihan " + (i + 1) + " harus diisi!");
                    document.getElementById("pilihan" + i).focus();
                    return;
                }


                // Memasukkan input user ke array
                arrayPilihan.push(nilai);
            }


            // ==========================================
            // MEMBUAT CHECKBOX DARI ARRAY
            // ==========================================

            const judulHobi = document.createElement("h3");
            judulHobi.textContent = "Pilih Hobi:";

            containerPilihan.appendChild(judulHobi);


            for (let i = 0; i < arrayPilihan.length; i++) {

                const div = document.createElement("div");

                const checkbox = document.createElement("input");

                checkbox.type = "checkbox";
                checkbox.name = "hobi";
                checkbox.value = arrayPilihan[i];
                checkbox.id = "hobi" + i;


                const label = document.createElement("label");

                label.htmlFor = "hobi" + i;
                label.textContent = arrayPilihan[i];


                div.appendChild(checkbox);
                div.appendChild(label);

                containerPilihan.appendChild(div);
            }


            // ==========================================
            // DROPDOWN PRODI
            // ==========================================

            const judulProdi = document.createElement("h3");

            judulProdi.textContent = "Pilih Program Studi:";

            containerPilihan.appendChild(judulProdi);


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
            // ==========================================

            const judulGender = document.createElement("h3");

            judulGender.textContent = "Pilih Jenis Kelamin:";

            containerPilihan.appendChild(judulGender);


            for (let i = 0; i < pilihanRadio.length; i++) {

                const radio = document.createElement("input");

                radio.type = "radio";
                radio.name = "jenisKelamin";
                radio.value = pilihanRadio[i];
                radio.id = "radio" + i;


                const labelRadio = document.createElement("label");

                labelRadio.htmlFor = "radio" + i;
                labelRadio.textContent = pilihanRadio[i];


                containerPilihan.appendChild(radio);
                containerPilihan.appendChild(labelRadio);

                containerPilihan.appendChild(document.createElement("br"));
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
            // EVENT TAMPILKAN HASIL
            // ==========================================

            tombolHasil.addEventListener("click", function () {

                // ==========================================
                // ARRAY HOBI YANG DIPILIH USER
                // ==========================================

                const hobiTerpilih = [];

                const semuaHobi =
                    document.querySelectorAll('input[name="hobi"]');


                for (let i = 0; i < semuaHobi.length; i++) {

                    if (semuaHobi[i].checked) {

                        hobiTerpilih.push(
                            semuaHobi[i].value
                        );
                    }
                }


                // ==========================================
                // MENGAMBIL PRODI
                // ==========================================

                const prodi =
                    document.getElementById("selectProdi").value;


                // ==========================================
                // MENGAMBIL JENIS KELAMIN
                // ==========================================

                const radioTerpilih =
                    document.querySelector(
                        'input[name="jenisKelamin"]:checked'
                    );


                let jenisKelamin = "";

                if (radioTerpilih !== null) {

                    jenisKelamin =
                        radioTerpilih.value;
                }


                // ==========================================
                // VALIDASI
                // ==========================================

                if (hobiTerpilih.length === 0) {

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


                // ==========================================
                // ARRAY DATA USER
                // ==========================================

                const dataUser = [
                    namaDepan,
                    namaBelakang,
                    email,
                    arrayPilihan,
                    hobiTerpilih,
                    prodi,
                    jenisKelamin
                ];


                // ==========================================
                // OUTPUT
                // ==========================================

                output.innerHTML = "";


                const judulHasil =
                    document.createElement("h2");

                judulHasil.textContent =
                    "Hasil Input";


                const hasilNama =
                    document.createElement("p");

                hasilNama.innerHTML =
                    "<b>Nama:</b> " +
                    dataUser[0] +
                    " " +
                    dataUser[1];


                const hasilEmail =
                    document.createElement("p");

                hasilEmail.innerHTML =
                    "<b>Email:</b> " +
                    dataUser[2];


                const hasilPilihan =
                    document.createElement("p");

                hasilPilihan.innerHTML =
                    "<b>Pilihan:</b> " +
                    dataUser[3].join(", ");


                const hasilHobi =
                    document.createElement("p");

                hasilHobi.innerHTML =
                    "<b>Hobi:</b> " +
                    dataUser[4].join(", ");


                const hasilProdi =
                    document.createElement("p");

                hasilProdi.innerHTML =
                    "<b>Program Studi:</b> " +
                    dataUser[5];


                const hasilGender =
                    document.createElement("p");

                hasilGender.innerHTML =
                    "<b>Jenis Kelamin:</b> " +
                    dataUser[6];


                output.appendChild(judulHasil);
                output.appendChild(hasilNama);
                output.appendChild(hasilEmail);
                output.appendChild(hasilPilihan);
                output.appendChild(hasilHobi);
                output.appendChild(hasilProdi);
                output.appendChild(hasilGender);


                // ==========================================
                // CONSOLE
                // ==========================================

                console.log("DATA USER");
                console.log(dataUser);

                console.log("ARRAY PILIHAN");
                console.log(arrayPilihan);

                console.log("ARRAY HOBI TERPILIH");
                console.log(hobiTerpilih);
            });

        });

    });

});