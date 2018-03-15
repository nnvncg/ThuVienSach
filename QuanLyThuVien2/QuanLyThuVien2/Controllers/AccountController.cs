using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
namespace WebThuVienSachOnline.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        ThuVienSachEntities db = new ThuVienSachEntities();
        public ActionResult Account()
        {
            return View();
        }
        public JsonResult Login(string email, string password)
        {
            TaiKhoan tk = db.TaiKhoan.FirstOrDefault(n => n.Email == email);
            if (tk == null || tk.MatKhau != password)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Session["Id"] = tk.MaTaiKhoan;
                Session["TypeAcc"] = tk.LoaiTaiKhoan;
                Session["Name"] = tk.HoVaTen;
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangePassword(string OldPassword, string NewPassword)
        {
            if (Session["Id"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int _id = Convert.ToInt32(Session["Id"]);
                TaiKhoan tk = db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == _id);
                if (tk.MatKhau != OldPassword)
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    tk.MatKhau = NewPassword;
                    db.Entry(tk).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public JsonResult ChangeInformation(string fullName, string address, string phone)
        {
            if (Session["Id"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int _id = Convert.ToInt32(Session["Id"]);
                TaiKhoan tk = db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == _id);
                if (fullName != "")
                {
                    tk.HoVaTen = fullName;
                }
                if (address != "")
                {
                    tk.DiaChi = address;
                }
                if (phone != "")
                {
                    tk.SoDienThoai = phone;
                }
                db.Entry(tk).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Logout()
        {
            Session.Remove("Id");
            Session.Remove("TypeAcc");
            Session.Remove("Name");
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AccountCurrent()
        {
            if (Session["Id"] != null)
            {
                int id = Convert.ToInt32(Session["Id"]);
                return View(db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == id));
            }
            return Redirect("/");
        }
    }
}