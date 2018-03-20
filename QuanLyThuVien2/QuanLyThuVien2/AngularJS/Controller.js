/// <reference path="../scripts/angular.min.js" />

var myCntr = angular.module("Controller", ['ngNotify']);

myCntr.controller("Login", function ($scope, $http, $notify, $window) {
    $scope.Load = true;
    $scope.Login = function (email, password) {
        $scope.Load = false;
        $http(
        {
            method: "POST",
            url: "/TaiKhoanAdmin/DangNhap",
            dataType: 'json',
            data: { email: email, password: password }
        }).then(function (response) {
            if (response.data) {
                $window.location.href = '/DonMuonAdmin/DonMuon';
            }
            else {
                $scope.Load = true;

                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Đăng nhập', 'Đăng nhập thất bại!');
            }
        });
    }
});
myCntr.controller("Sach", function ($scope, $http, Upload, $notify, $window) {
    getAllBook();
    $scope.pageSize = 5;
    $scope.selectedPage = 1;
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    };
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    };
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    };
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    };
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    };

    load();
    function load() {
        $scope.ThemMoi = true;
        $scope.Xoa = true;
        $scope.ChiTiet = true;
        $scope.dataDelete = null;
        $scope.dataInfo = null;
        $scope.file = null;
        $scope.dataEdit = null;
        $scope.Sua = true;
        $scope.TieuDe = "";

    };
    ChuDe();
    function ChuDe() {
        $http(
        {
            method: "Get",
            url: "/ChuDeAdmin/DanhSachChuDe",
        }).then(function (response) {
            $scope.ChuDe = response.data;
        })
    };
    NhaXB();
    function NhaXB() {
        $http(
        {
            method: "Get",
            url: "/NhaXuatBan/DanhSachNXB",
        }).then(function (response) {
            $scope.NhaXB = response.data;
        })
    };
    $scope.Thoat = function () {
        load();
    };
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };
    $scope.onReady = function () {
        // ... 
    };
    //quản lý chủ đê
    $scope.ChuDeAdd = function () {
        load();
        $scope.TieuDe = "Thêm chủ đề mới ";
        $scope.ThemMoi = false;
    }
    $scope.ThemChuDe2 = function (cd) {
        $http(
        {
            method: "POST",
            url: "/ChuDeAdmin/ThemChuDe",
            dataType: 'json',
            data: { cd: cd }
        }).then(function (response) {
            if (response.data) {
                ChuDe();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Thêm chủ đề', 'Thêm chủ đề thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Thêm chủ đề', 'Thêm chủ đề thất bại!');
            }
        })
    }
    $scope.XemChiTietChuDe = function (id, loai) {
        $http(
        {
            method: "POST",
            url: "/ChuDeAdmin/ChiTietChuDe",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (loai == 2) {
                load();
                $scope.TieuDe = "Sửa thông tin chủ đề";
                $scope.Sua = false;
                $scope.dataEdit = response.data;
            }
            if (loai == 1) {
                load();
                $scope.TieuDe = "Xóa thông tin  chủ đề";
                $scope.Xoa = false;
                $scope.dataDelete = response.data;
            }
        })
    };
    $scope.SuaChuDe = function (cd) {
        $http(
        {
            method: "POST",
            url: "/ChuDeAdmin/SuaChuDe",
            dataType: 'json',
            data: { cd: cd }
        }).then(function (response) {
            if (response.data) {
                ChuDe();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa chủ đề', 'Sửa chủ đề thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Sửa chủ đề', 'Sửa chủ đề thất bại!');
            }
        })
    }
    $scope.XoaChuDe = function (id) {
        $http(
        {
            method: "POST",
            url: "/ChuDeAdmin/Xoa",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (response.data) {
                ChuDe();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Xóa chủ đề', 'Xóa chủ đề thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Xóa chủ đề', 'Xóa chủ đề thất bại!');
            }
        })
    }
    //quản lý nxb
    $scope.NXBAdd = function () {
        $scope.TieuDe = "Thêm nhà xuất bản mới ";
        $scope.ThemMoi = false;

    }
    $scope.ThemNXB2 = function (nxb) {
        $http(
        {
            method: "POST",
            url: "/NhaXuatBan/ThemNXB",
            dataType: 'json',
            data: { nxb: nxb }
        }).then(function (response) {
            if (response.data) {
                NhaXB();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Thêm nhà xuất bản', 'Thêm nhà xuất bản thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Thêm nhà xuất bản', 'Thêm nhà xuất bản thất bại!');
            }
        })
    }
    $scope.XemChiTietNXB = function (id, loai) {
        $http(
        {
            method: "POST",
            url: "/NhaXuatBan/ChiTietNXB",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (loai == 2) {
                load();
                $scope.TieuDe = "Sửa thông tin nhà xuất bản";
                $scope.Sua = false;
                $scope.dataEdit = response.data;
            }
            if (loai == 1) {
                load();
                $scope.TieuDe = "Xóa thông tin nhà xuất bản";
                $scope.Xoa = false;
                $scope.dataDelete = response.data;
            }
        })
    };
    $scope.SuaNXB = function (nxb) {
        $http(
        {
            method: "POST",
            url: "/NhaXuatBan/SuaNXB",
            dataType: 'json',
            data: { nxb: nxb }
        }).then(function (response) {
            if (response.data) {
                NhaXB();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa nhà xuất bản', 'Sửa nhà xuất bản thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Sửa nhà xuất bản', 'Sửa nhà xuất bản thất bại!');
            }
        })
    }
    $scope.XoaNXB = function (id) {
        $http(
        {
            method: "POST",
            url: "/NhaXuatBan/Xoa",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (response.data) {
                NhaXB();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Xóa nhà xuất bản', 'Xóa nhà xuất bản thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Xóa nhà xuất bản', 'Xóa nhà xuất bản thất bại!');
            }
        })
    }
    //quản lý sách
    function getAllBook() {
        $http(
        {
            method: "Get",
            url: "/SachesAdmin/AllBook",
        }).then(function (response) {
            $scope.dataBook = response.data;
        })
    };
    $scope.AddBook = function () {
        load();
        $scope.TieuDe = "Thêm sách mới ";
        $scope.ThemMoi = false;
        $scope.DataNew.SoLuongTon = 1;
    };
    $scope.XemChiTiet = function (id, loai) {
        $http(
        {
            method: "POST",
            url: "/SachesAdmin/ChiTiet",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (loai == 3) {
                load();
                $scope.Xoa = false;
                $scope.TieuDe = "Xóa sách";
                $scope.dataDelete = response.data;

            }
            if (loai == 2) {
                load();
                $scope.TieuDe = "Sửa thông tin";
                $scope.Sua = false;
                $scope.dataEdit = response.data;
                $scope.NewImg1 = '/Content/img/Sach/' + response.data.AnhBia;

            }
            if (loai == 1) {
                load();
                $scope.TieuDe = "Xem Chi Tiết";
                $scope.ChiTiet = false;
                $scope.dataInfo = response.data;
            }
        })
    }
    $scope.XacDinhXoa = function (id) {
        $http(
        {
            method: "POST",
            url: "/SachesAdmin/Xoa",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (response.data) {
                getAllBook();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Xóa sách', 'Xóa sách thành công!');
                $scope.DataNew = "";
                $scope.file = "";
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Xóa sách', 'Xóa sách thất bại!');
            }
        })
    }
    $scope.EditBook2 = function (sach, file) {
        file.upload = Upload.upload({
            url: "/SachesAdmin/EditBook",
            data: { sach, Image: file },
            }).then(function (response) {
            if (response.data) {
                getAllBook();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa sách', 'Sửa sách thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Sửa sách', 'Sửa sách thất bại!');
            }
            })
    };
    $scope.AddBook2 = function (sach, file) {
        file.upload = Upload.upload({
            url: "/SachesAdmin/AddBook",
            data: { sach, Image: file },
            }).then(function (response) {
                if (response.data) {
                    getAllBook();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm sách', 'Thêm sách thành công!');
                    $scope.sach = "";
                    $scope.file = "";
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Thêm sách', 'Thêm sách thất bại!');
                }
            })
    };
});
myCntr.controller("TaiKhoan", function ($scope, $http, Upload, $notify, $window) {
    $scope.pageSize = 5;
    $scope.selectedPage = 1;
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    };
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    };
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    };
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    };
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    };
    $scope.TKAdd = function () {
        load();
        $scope.TieuDe = "Thêm tài khoản.";
        $scope.dataNew = null;
        $scope.ThemMoi = false;

    }
    $scope.XoaTaiKhoan = function (tk) {
        $http(
        {
            method: "POST",
            url: "/TaiKhoanAdmin/Xoa",
            dataType: 'json',
            data: { tk: tk }
        }).then(function (response) {
            if (response.data) {
                TaiKhoan();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Xóa tài khoản', 'Xóa tài khoản thành công!');
                $scope.DataNew = "";
                $scope.file = "";
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Xóa tài khoản', 'Xóa tài khoản thất bại!');
            }
        })
    };
    $scope.ThemTaiKhoan = function (tk) {
        $http(
        {
            method: "POST",
            url: "/TaiKhoanAdmin/Them",
            dataType: 'json',
            data: { tk: tk }
        }).then(function (response) {
            if (response.data) {
                TaiKhoan();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Thêm tài khoản', 'Thêm tài khoản thành công!');
                $scope.dataNew = null;

            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Thêm tài khoản', 'Thêm tài khoản thất bại!');
            }
        })
    };
    $scope.SuaTaiKhoan = function (tk) {
        $http(
        {
            method: "POST",
            url: "/TaiKhoanAdmin/Sua",
            dataType: 'json',
            data: { tk: tk }
        }).then(function (response) {
            if (response.data) {
                TaiKhoan();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa tài khoản', 'Sửa tài khoản thành công!');
                $scope.DataNew = "";
                $scope.file = "";
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Sửa tài khoản', 'Sửa tài khoản thất bại!');
            }
        })
    };
    $scope.XemChiTiet = function (id, loai) {
        $http(
        {
            method: "POST",
            url: "/TaiKhoanAdmin/ChiTiet",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (loai == 2) {
                load();
                $scope.TieuDe = "Sửa thông tin tài khoản";
                $scope.Sua = false;
                $scope.dataEdit = response.data;
            }
            if (loai == 1) {
                load();
                $scope.TieuDe = "Xóa thông tin tài khoản";
                $scope.Xoa = false;
                $scope.dataDelete = response.data;
            } if (loai == 3) {
                load();
                $scope.TieuDe = "chi tiết thông tin tài khoản";
                $scope.ChiTiet = false;
                $scope.dataInfo = response.data;
            }
        })
    };
    load();
    function load() {
        $scope.ThemMoi = true;
        $scope.Xoa = true;
        $scope.ChiTiet = true;
        $scope.dataDelete = null;
        $scope.dataInfo = null;
        $scope.dataEdit = null;
        $scope.Sua = true;
        $scope.TieuDe = "";
    };
    TaiKhoan();
    function TaiKhoan() {
        $http(
        {
            method: "Get",
            url: "/TaiKhoanAdmin/DanhSachTaiKhoan",
        }).then(function (response) {
            $scope.TaiKhoan = response.data;
        })
    };
    LoaiTaiKhoan();
    function LoaiTaiKhoan() {
        $http(
        {
            method: "Get",
            url: "/LoaiTKAdmin/DanhSach",
        }).then(function (response) {
            $scope.LoaiTK = response.data;
        })
    };
    $scope.Thoat = function () {
        load();
    };

});
myCntr.controller("DonMuon", function ($scope, $http, Upload, $notify, $window) {
    $scope.pageSize = 5;
    $scope.selectedPage = 1;
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    };
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    };
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    };
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    };
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    };

    loaiTimKiem();
    function loaiTimKiem() {
        $scope.Date = true;
        $scope.Text = true;
        $scope.All = true;
        $scope.CheckDate = null;
    }
    $scope.Loai = 1;
    PhanLoai();
    //tìm kiếm
    function PhanLoai() {
        if ($scope.Loai == 1) {
            loaiTimKiem();
            DanhSach();
        }
        if ($scope.Loai == 2) {
            loaiTimKiem();
            $scope.Date = false;
            $scope.All = false;
            $scope.Ngay = 1;
        }
        if ($scope.Loai == 3) {
            loaiTimKiem();
            $scope.Date = false;
            $scope.All = false;
            $scope.Ngay = 2;
        }
        if ($scope.Loai == 4) {
            loaiTimKiem();
            $scope.Text = false;
            $scope.All = false;
        }
        if ($scope.Loai == 5) {
            loaiTimKiem();
            $scope.All = false;
            QuaHan();
        }
    }
    $scope.Radio = function (ma) {
        $scope.Loai = ma;
        PhanLoai();
    }
    function QuaHan() {
        $http(
            {
                method: "Get",
                url: "/DonMuonAdmin/QuaHan",
            }).then(function (response) {
                $scope.DanhSach = response.data;
            })
    }
    $scope.ChangeText = function (text) {
        if (text!='') {
            $http(
            {
                method: "Post",
                url: "/DonMuonAdmin/TimTheoTK",
                dataType: 'json',
                data: { tuKhoa: text }
            }).then(function (response) {
                $scope.DanhSach = response.data;
            })
        }
        else {
            DanhSach();
        }
    }
    $scope.ChangeDate = function (date) {
        if ($scope.Ngay == 1) {
            $http(
            {
                method: "Post",
                url: "/DonMuonAdmin/TimTheoNgay",
                dataType: 'json',
                data: { dt: date, loai: 1 }
            }).then(function (response) {
                $scope.DanhSach = response.data;
            })
        }
        if ($scope.Ngay == 2) {
            $http(
            {
                method: "Post",
                url: "/DonMuonAdmin/TimTheoNgay",
                dataType: 'json',
                data: { dt: date, loai: 2 }
            }).then(function (response) {
                $scope.DanhSach = response.data;
            })
        }
    }
    $scope.mang = [];
    $scope.AddDetail = function (sach, sl) {
        $scope.mang.push({ MaSach: sach, SoLuong: sl });
        $scope.MaSach = null; $scope.SoLuong = null;
    }
    $scope.removeItem = function (x) {
        $scope.mang.splice(x, 1);
    }
    $scope.HDAdd = function () {
        load();
        $scope.TieuDe = "Thêm đơn mượn mới";
        $scope.ThemMoi = false;
    }
    $scope.SuaDH = function (dh) {
        $http(
        {
            method: "POST",
            url: "/DonMuonAdmin/Sua",
            dataType: 'json',
            data: { dh: dh }
        }).then(function (response) {
            if (response.data) {
                PhanLoai();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa đơn mượn', 'Sửa đơn mượn thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Sửa đơn mượn', 'Sửa đơn mượn thất bại!');
            }
        })
    };
    $scope.ThemDH = function (dh) {
        $http(
        {
            method: "POST",
            url: "/DonMuonAdmin/Them",
            dataType: 'json',
            data: { dh: dh, chiTiet: $scope.mang }
        }).then(function (response) {
            if (response.data) {
                PhanLoai();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Thêm đơn mượn', 'Thêm đơn mượn thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Thêm đơn mượn', 'Thêm đơn mượn thất bại!');
            }
        })
    };
    $scope.XoaDH = function (dh) {
        $http(
        {
            method: "POST",
            url: "/DonMuonAdmin/Xoa",
            dataType: 'json',
            data: { dh: dh }
        }).then(function (response) {
            if (response.data) {
                PhanLoai();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Xóa đơn mượn', 'Xóa đơn mượn thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Xóa đơn mượn', 'Xóa đơn mượn thất bại!');
            }
        })
    };
    $scope.XemChiTiet = function (id, loai) {
        $http(
        {
            method: "POST",
            url: "/DonMuonAdmin/ChiTiet",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            if (loai == 2) {
                load();
                $scope.TieuDe = "Sửa thông tin đơn mượn sách";
                $scope.Sua = false;
                $scope.dataEdit = response.data;
                $scope.dataEdit.NgayMuon = null;
                $scope.dataEdit.NgayTra = null;
            }
            if (loai == 1) {
                load();
                $scope.TieuDe = "Xóa thông tin đơn mượn sách";
                $scope.Xoa = false;
                $scope.dataDelete = response.data;
            }
            if (loai == 3) {
                load();
                $scope.TieuDe = "Thông tin đơn mượn sách";
                $scope.ChiTiet = false;
                $scope.dataInfo = response.data;
                DonHangChiTiet($scope.dataInfo.MaDonHang);
            }
        })
    };
    function DonHangChiTiet(id) {
        $http(
        {
            method: "POST",
            url: "/DonMuonAdmin/ChiTietDonMuon",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            $scope.ChiTietDonMuon = response.data;
        })
    };
    Sach();
    function Sach() {
        $http(
        {
            method: "Get",
            url: "/SachesAdmin/AllBook",
        }).then(function (response) {
            $scope.Sach = response.data;
        })
    };
    load();
    function load() {
        $scope.ThemMoi = true;
        $scope.Xoa = true;
        $scope.ChiTiet = true;
        $scope.dataDelete = null;
        $scope.dataInfo = null;
        $scope.file = null;
        $scope.dataEdit = null;
        $scope.Sua = true;
        $scope.TieuDe = "";
    };
    TaiKhoan();
    function TaiKhoan() {
        $http(
        {
            method: "Get",
            url: "/TaiKhoanAdmin/DanhSachTaiKhoan",
        }).then(function (response) {
            $scope.TaiKhoan = response.data;
        })
    };
    function DanhSach() {
        $http(
        {
            method: "Get",
            url: "/DonMuonAdmin/DanhSach",
        }).then(function (response) {
            $scope.DanhSach = response.data;
        })
    };
    TinhTrang();
    function TinhTrang() {
        $http(
        {
            method: "Get",
            url: "/TinhTrangAdmin/DanhSach",
        }).then(function (response) {
            $scope.TinhTrang = response.data;
        })
    };
});
myCntr.controller("PhanQuyen", function ($scope, $http, Upload, $notify, $window) {

    //Phân quyền
    //XemPhanQuyen();
    //function XemPhanQuyen() {
    //    $http(
    //    {
    //        method: "Get",
    //        url: "/LoaiTKAdmin/DanhSach",
    //    }).then(function (response) {
    //        $scope.LoaiTK = response.data;
    //    })
    //};

    $scope.pageSize = 8;
    $scope.selectedPage = 1;
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    };
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    };
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    };
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    };
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    };
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    };
    LoaiTaiKhoan();
    function LoaiTaiKhoan() {
        $http(
        {
            method: "Get",
            url: "/LoaiTKAdmin/DanhSach",
        }).then(function (response) {
            $scope.LoaiTK = response.data;
        })
    };
    TatCaQuyen();
    function TatCaQuyen() {
        $http(
        {
            method: "Get",
            url: "/PhanQuyenAdmin/DanhSachQuyen",
        }).then(function (response) {
            $scope.DSTatCaQuyen = response.data;
        })
    };
    $scope.ChiTiet = function (id,ten) {
        $scope.Ten = ten;
        $scope.Ltk = id;
        QuyenTheoLoaiTK(id);
        QuyenChuaChon(id);
    };
    function QuyenTheoLoaiTK(id) {
        $http(
        {
            method: "POST",
            url: "/PhanQuyenAdmin/DanhSach",
            dataType: 'json',
            data: { ltk: id }
        }).then(function (response) {
            $scope.DSQuyen = response.data;           
        })
        $http(
        {
            method: "POST",
            url: "/PhanQuyenAdmin/DanhSachChuaChon",
            dataType: 'json',
            data: { id: id }
        }).then(function (response) {
            $scope.DSQuyenChuaChon = response.data;
        })
    }

    $scope.Them = function (quyen) {
        $http(
        {
            method: "POST",
            url: "/PhanQuyenAdmin/ThemPhanQuyen",
            dataType: 'json',
            data: { ltk: $scope.Ltk, Quyen: quyen }
        }).then(function (response) {
            if (response.data) {
                QuyenTheoLoaiTK($scope.Ltk);
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Thêm quyền', 'Thêm quyền thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Thêm quyền', 'Thêm quyền thất bại!');
            }
        })
    };
    $scope.Xoa = function (quyen) {
        $http(
        {
            method: "POST",
            url: "/PhanQuyenAdmin/XoaPhanQuyen",
            dataType: 'json',
            data: { ltk: $scope.Ltk, Quyen: quyen }
        }).then(function (response) {
            if (response.data) {
                QuyenTheoLoaiTK($scope.Ltk);
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Xóa quyền', 'Xóa quyền thành công!');
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Xóa quyền', 'Xóa quyền thất bại!');
            }
        })
    };
});