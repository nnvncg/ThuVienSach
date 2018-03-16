/// <reference path="../scripts/angular.min.js" />

var myCntr = angular.module("Controller", ['ngNotify']);


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