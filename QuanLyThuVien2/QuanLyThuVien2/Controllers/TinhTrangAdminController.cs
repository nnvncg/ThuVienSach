using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
namespace QuanLyThuVien2.Controllers
{
    public class TinhTrangAdminController : Controller
    {
        // GET: TinhTrangAdmin
        ThuVienSachEntities db = new ThuVienSachEntities();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult DanhSach()
        {
            return Json(db.TinhTrang.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}