let studentList = [];

function DomID(id) {
    return document.querySelector(id);
}
// Function 1: lấy danh sách sinh viên từ backend
const fetchStudents = () => {
        axios({
            url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
            method: "GET",
        }).then((res) => {
            // console.log(res);
            studentList = res.data;
            // console.log(studentList);
            renderStudents();

        }).catch((err) => {
            console.log(err);
        });
    }
    // function 2: hiển thị danh sách sinh viên ra màn hình
const renderStudents = () => {
    let htmlContent = "";
    for (let student of studentList) {
        htmlContent += `<tr>
                            <td>${student.MaSV}</td>
                            <td>${student.HoTen}</td>
                            <td>${student.Email}</td>
                            <td>${student.SoDT}</td>
                            <td>${student.DiemToan}</td>
                            <td>${student.DiemLy}</td>
                            <td>${student.DiemHoa}</td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV}')">Xóa</button>
                                <button class="btn btn-info" onclick="getStudent('${student.MaSV}')">Cập nhật</button>
                            </td>
                        <tr>`;
    }
    let tbody = document.querySelector('#tableDanhSach').innerHTML = htmlContent;

};
// function 3: thêm sinh viên
const addStudent = () => {
    const _studentId = DomID("#id").value;
    const _studentName = DomID("#name").value;
    const _studentEmail = DomID("#email").value;
    const _studentPhone = DomID("#phone").value;
    const _studentIdCard = DomID("#idCard").value;
    const _studentMath = DomID("#math").value;
    const _studentPhysics = DomID("#physics").value;
    const _studentChemistry = DomID("#chemistry").value;
    const newStudent = new Student(_studentId, _studentName, _studentEmail, _studentPhone, _studentIdCard, _studentMath, _studentPhysics, _studentChemistry);
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
        method: "POST",
        data: newStudent,
    }).then((res) => {
        console.log(res);
        // fetch danh sách student mới
        fetchStudents();
        DomID("#id").value = '';
        DomID("#name").value = '';
        DomID("#email").value = '';
        DomID("#phone").value = '';
        DomID("#idCard").value = '';
        DomID("#math").value = '';
        DomID("#physics").value = '';
        DomID("#chemistry").value = '';
    }).catch((err) => {
        console.log(err);
    })

};
// function 4: xóa sinh viên
const deleteStudent = (idDel) => {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${idDel}`,
        method: "DELETE",
    }).then((res) => {
        console.log(res);
        fetchStudents();
    }).catch((err) => {
        console.log(err);
    });
}

// function 5: lấy thông tin muốn cập nhật và show lên form
const getStudent = (id) => {
        axios({
            url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
            method: 'GET',
        }).then((res) => {
            console.log(res);
            DomID("#btnThem").click();
            DomID("#id").value = res.data.MaSV;
            DomID("#name").value = res.data.HoTen;
            DomID("#email").value = res.data.Email;
            DomID("#phone").value = res.data.SoDT;
            DomID("#idCard").value = res.data.CMND;
            DomID("#math").value = res.data.DiemToan;
            DomID("#physics").value = res.data.DiemLy;
            DomID("#chemistry").value = res.data.DiemHoa;
            DomID("#id").setAttribute("disabled", true);
        }).catch((err) => {
            console.log(err);
        });
    }
    // function 6: cập nhật thông tin sinh viên
const updateStudent = () => {
    const _studentId = DomID("#id").value;
    const _studentName = DomID("#name").value;
    const _studentEmail = DomID("#email").value;
    const _studentPhone = DomID("#phone").value;
    const _studentIdCard = DomID("#idCard").value;
    const _studentMath = DomID("#math").value;
    const _studentPhysics = DomID("#physics").value;
    const _studentChemistry = DomID("#chemistry").value;
    const updatedStudent = new Student(_studentId, _studentName, _studentEmail, _studentPhone, _studentIdCard, _studentMath, _studentPhysics, _studentChemistry);
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
        method: "PUT",
        data: updatedStudent,
    }).then((res) => {
        console.log(res);
        // clear form
        DomID('#btnReset').click();
        // ẩn popup
        DomID('#btnClose').click();
        // mở khóa input ad
        DomID('#id').removeAttribute("disabled");
        // fetch danh sách student mới
        fetchStudents();

    }).catch((err) => {
        console.log(err);
    })
}
fetchStudents();