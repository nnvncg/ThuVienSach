using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;

namespace QuanLyThuVien2.Controllers
{
    public class LoaiTKAdminController : Controller
    {
        ThuVienSachEntities db = new ThuVienSachEntities();
        // GET: TinhTrangAdmin
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult DanhSach()
        {
            return Json(db.LoaiTaiKhoan.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}