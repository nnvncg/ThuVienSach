//Xóa sách đã mmnuon
function RemoveOrder(idDD){
    $.ajax({
        url: '/DonMuon/XoaDonHang',
        type: 'POST',
        dataType: 'json',
        data: {
            id: idDD
        },
        success: function (data) {
            if (data) {
                window.location.href = $(location).attr('href');
            }
            else {
                $.notify('Đã xóa thất bại');
            }
        }
        
    })
}

//danh sách sách đánh dấu
ShowAllBook();

function ShowAllBook() {
    var str = "";
    $.ajax({
        url: '/Sach/SachDD',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (key, val) {
                str += '<div class="card col-sm-4"><div class="card-header bg-warning text-white">' +
                    val.TenSach +
                '</div>' +
                '<div class="card-body">' +
                '<img class="col-sm-12 mt-1 rounded" src="/Content/img/Sach/' + val.AnhBia + '" alt="' + val.TenSach + '">' +
                    val.MoTa.substring(0, 50) + '...<br/><hr/>' +
                '<div class="row"><div class="col-sm-6">' +
                '<a href="/Sach/XemChiTiet/' + val.MaSach + '">Xem chi tiết sách</a></div>' +
                '<div class="col-sm-6 "><button onclick="RemoveTick(this)" data-idBook="' + val.MaSach + '">Xóa đánh dấu sách</button></div></div>' +
                '</div>' +
                '</div>'
                ;
            });
            $('#divBook').html(str);

        }
    });
    return false;
}
//đánh dấu sách
function TickBook(Book) {
    $.ajax({
        url: '/Sach/KiemTraDanhDau',
        type: 'POST',
        dataType: 'json',
        data: {
            idSach: Book.getAttribute("data-idBook")
        },
        success: function (data) {
            if (data) {
                $.notify('Lỗi: Sách này bạn đã đánh dấu rồi!');
            }
            else {
                $.ajax({
                    url: '/Sach/ThemDanhDau',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        idSach: Book.getAttribute("data-idBook")
                    },
                    success: function (data) {
                        if (data) {
                            $.notify('Đánh dấu thành công!', 'success');
                        }
                        else {
                            $.notify('Lỗi: Đánh dấu thất bại!');
                        }
                    },
                    error: function (err) {
                        $.notify('Lỗi: Đánh dấu thất bại!');
                    }
                })
            }
        }
    })

}
//Xóa đánh dấu
function RemoveTick(Book) {
    var animalType = Book.getAttribute("data-idBook");
    $.ajax({
        url: '/Sach/XoaDD',
        type: 'POST',
        dataType: 'json',
        data: {
            idBook: Book.getAttribute("data-idBook")
        },
        success: function (data) {
            if (data) {
                $.notify('Xóa thành công!', 'success');
                ShowAllBook();
                return false;
               // window.location.href = $(location).attr('href');
            }
            else {
                $.notify('Lỗi: Xóa đánh dấu thất bại!');
            }
        }        
    })
    return false;
}

//sửa thông tin tài khoản
$("#ChangeInformation").click(function (e) {
    e.preventDefault();
    if ($("#txtFullName").val() ===''&& $("#txtAddress").val() ===''&& $("#txtPhone").val() === '') {
        $.notify('Lỗi: Đổi thông tin thất bại!');
    }
    else {
        $.ajax({
            url: '/Account/ChangeInformation',
            type: 'POST',
            dataType: 'json',
            data: {
                fullName: $("#txtFullName").val(),
                address: $("#txtAddress").val(),
                phone: $("#txtPhone").val()
            },
            success: function (data) {
                if (data) {
                    window.location.href = $(location).attr('href');
                    $.notify("Đã đổi thông tin thành công!!", "success");
                    clear2();
                }
                else {
                    $.notify('Lỗi: Đổi thông tin thất bại!');
                }
            },
            error: function (err) {
                $.notify('Lỗi: Đổi thông tin thất bại!');
                clear3();
            }
        })
    }

});
function clear3() {
    $("#txtFullName").val("");
    $("#txtAddress").val("");
    $("#txtPhone").val("");
};
//đổi pass
$("#saveNewPassword").click(function (e) {
    e.preventDefault();
    if ($("#NewPassword").val() != $("#NewPassword2").val() || $("#NewPassword2").val()==='') {
        $.notify('Mật khẩu xác nhận không đúng!');
    }
    else {
        $.ajax({
            url: '/Account/ChangePassword',
            type: 'POST',
            dataType: 'json',
            data: {
                OldPassword: $("#OldPassword").val(),
                NewPassword: $("#NewPassword").val()
            },
            success: function (data) {
                if (data) {
                    $.notify("Đã đổi mật khẩu!!", "success");
                    clear2();
                }
                else {
                    $.notify('Lỗi: Đổi mật khẩu thất bại!');
                }
            },
            error: function (err) {
                $.notify('Lỗi: Đổi mật khẩu thất bại!');
                clear2();
            }
        })
    }

});
function clear2() {
    $("#OldPassword").val("");
    $("#NewPassword").val("");
    $("#NewPassword2").val("");
};
$("#btnLogin").click(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/Account/Login',
        type: 'POST',
        dataType: 'json',
        data: {
            email: $("#txtEmail").val(),
            password: $("#txtPassword").val()
        },
        success: function (data) {
            if (data) {
                window.location.href = $(location).attr('href');
            }
            else {
                $.notify('Tài khoản hoặc mật khẩu sai!');
            }
        },
        error: function (err) {
            $.notify('Lỗi: Đăng nhập thất bại!');
            clear();
        }
    })
});
$("#btnLogOut").click(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/Account/Logout',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data) {
                $.notify('Đã đăng xuất!');
                window.location.href = $(location).attr('href');
            }
            else {
                $.notify('Đăng xuất thất bại!');
            }
        },
        error: function (err) {
            $.notify('Lỗi: Đăng nhập thất bại!');
            clear();
        }
    })
});
function clear() {
    $("#txtEmail").val("");
    $("#txtPassword").val("");
};