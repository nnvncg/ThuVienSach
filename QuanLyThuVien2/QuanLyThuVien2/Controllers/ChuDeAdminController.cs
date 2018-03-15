using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
namespace QuanLyThuVien2.Controllers
{
    public class ChuDeAdminController : Controller
    {
        // GET: ChuDeAdmin
        private ThuVienSachEntities db = new ThuVienSachEntities();

        public ActionResult ChuDe()
        {
            return View();
        }
        public JsonResult DanhSachChuDe()
        {
            return Json(db.ChuDe.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChiTietChuDe(int id)
        {
            return Json(db.ChuDe.FirstOrDefault(n => n.MaChuDe == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ThemChuDe(ChuDe cd)
        {
            try
            {
                db.ChuDe.Add(cd);
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SuaChuDe(ChuDe cd)
        {
            try
            {
                db.Entry(cd).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Xoa(int id)
        {
            try
            {
                ChuDe cd = db.ChuDe.FirstOrDefault(n => n.MaChuDe == id);
                db.ChuDe.Remove(cd);
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}