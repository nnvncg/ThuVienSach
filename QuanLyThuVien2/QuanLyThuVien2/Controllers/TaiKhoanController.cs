using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
namespace QuanLyThuVien2.Controllers
{
    public class TaiKhoanController : Controller
    {
        // GET: TaiKhoan
        ThuVienSachEntities db = new ThuVienSachEntities();
        public ActionResult TaiKhoan()
        {
            return View();
        }
    }
}