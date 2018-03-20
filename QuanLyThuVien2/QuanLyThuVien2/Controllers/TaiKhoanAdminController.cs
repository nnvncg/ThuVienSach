using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
using System.Data.Entity;

namespace QuanLyThuVien2.Controllers
{
    public class TaiKhoanAdminController : Controller
    {
        // GET: TaiKhoan
        ThuVienSachEntities db = new ThuVienSachEntities();
        public ActionResult TaiKhoan()
        {
            if (Session["Login"] == null)
            {
                return Redirect("/TaiKhoanAdmin/Login");
            }
            return View();
        }
        public ActionResult Login()
        {
            if (Session["Login"] != null)
            {
                return Redirect("/DonMuonAdmin/DonMuon");
            }
            return View();
        }
        public JsonResult DangNhap(string email,string password)
        {
            var tk = db.TaiKhoan.FirstOrDefault(n => n.Email == email && n.MatKhau == password&&n.LoaiTaiKhoan!=2);
            if (tk == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Session["Login"] = 1;
                Session["HoTen"] = tk.HoVaTen;
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult DangXuat()
        {
            Session.Remove("Login");
            Session.Remove("HoTen");
            return RedirectToAction("Login");
        }
        public JsonResult DanhSachTaiKhoan()
        {
            return Json(db.TaiKhoan.Where(n => n.KichHoat).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChiTiet(int id)
        {
            return Json(db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Xoa(TaiKhoan tk)
        {
            try
            {
                tk.KichHoat = false;
                db.Entry(tk).State = EntityState.Modified;
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Sua(TaiKhoan tk)
        {
            try
            {
                db.Entry(tk).State =EntityState.Modified;
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Them(TaiKhoan tk)
        {
            try
            {
                tk.KichHoat = true;
                db.TaiKhoan.Add(tk);
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