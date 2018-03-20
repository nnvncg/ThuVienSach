using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
using System.Data.Entity;

namespace QuanLyThuVien2.Controllers
{
    public class NhaXuatBanController : Controller
    {
        // GET: NhaXuatBan
        private ThuVienSachEntities db = new ThuVienSachEntities();

        public ActionResult NhaXuatBan()
        {
            if (Session["Login"] == null)
            {
                return Redirect("/TaiKhoanAdmin/Login");
            }
            return View();
        }
        public JsonResult DanhSachNXB()
        {
            return Json(db.NhaXuatBan.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChiTietNXB(int id)
        {
            return Json(db.NhaXuatBan.FirstOrDefault(n=>n.MaNXB==id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ThemNXB(NhaXuatBan nxb)
        {
            try
            {
                db.NhaXuatBan.Add(nxb);
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SuaNXB(NhaXuatBan nxb)
        {
            try
            {
                db.Entry(nxb).State = EntityState.Modified;
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
                NhaXuatBan nxb = db.NhaXuatBan.FirstOrDefault(n => n.MaNXB == id);
                db.NhaXuatBan.Remove(nxb);
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