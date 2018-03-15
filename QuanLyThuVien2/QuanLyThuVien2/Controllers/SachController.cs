using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;

namespace QuanLyThuVien2.Controllers
{
    public class SachController : Controller
    {
        // GET: Sach
        ThuVienSachEntities _db = new ThuVienSachEntities();
        public ActionResult XemChiTiet(int id)
        {
            Sach sach = _db.Sach.FirstOrDefault(n => n.MaSach == id);
            ViewBag.ThongBao = "";
            if (sach == null)
            {
                ViewBag.ThongBao = "Không có sách này trong thư viện.";
            }
            else
            {
                ViewBag.TenSach = sach.TenSach;
                ViewBag.NhaXB = _db.NhaXuatBan.FirstOrDefault(n => n.MaNXB == sach.MaNXB).TenNXB;
                ViewBag.ChuDe = _db.ChuDe.FirstOrDefault(n => n.MaChuDe == sach.MaChuDe).TenChuDe;
                sach.LuotXem++;
                _db.Entry(sach).State = EntityState.Modified;
                _db.SaveChanges();

            }
            return View(sach);
        }
        public ActionResult SachDanhDau()
        {
            if (Session["Id"] == null)
            {
                return Redirect("/");
            }
            else
            {
                return View();
            }
        }

        public ActionResult SachDaMuon()
        {
            if (Session["Id"] == null)
            {
                return Redirect("/");
            }
            else
            {
                int _id = Convert.ToInt32(Session["Id"]);
                var donHang = _db.DonHang.Where(n => n.MaTaiKhoan == _id).Include(s => s.TinhTrang);
                return View(donHang.ToList());
            }
        }
        public JsonResult SachDD()
        {
            int id = Convert.ToInt32(Session["Id"]);

            TaiKhoan tk = _db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == id);
            if (tk != null)
            {
                var lstSach = _db.Sach.Where(n => n.DanhDau.FirstOrDefault(m => m.MaTaiKhoan == id) != null).ToList();
                return Json(lstSach, JsonRequestBehavior.AllowGet);
            }
            else return Json(null, JsonRequestBehavior.AllowGet);

        }
        public JsonResult KiemTraDanhDau(string idSach)
        {
            int idTk = Convert.ToInt32(Session["Id"]);
            int idS = Convert.ToInt32(idSach);

            try
            {
                TaiKhoan tk = _db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == idTk);
                DanhDau dd = _db.DanhDau.FirstOrDefault(n => n.MaSach == idS && n.MaTaiKhoan == idTk);
                if (tk != null&&dd!=null)
                {                   
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else return Json(false, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ThemDanhDau(string idSach)
        {
            int idTk = Convert.ToInt32(Session["Id"]);
            try
            {
                TaiKhoan tk = _db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == idTk);
                if (tk != null)
                {
                    DanhDau dd = new DanhDau();
                    dd.NgayTao = DateTime.Now;
                    dd.MaSach = Convert.ToInt32(idSach);
                    dd.MaTaiKhoan = idTk;
                    _db.DanhDau.Add(dd);
                    _db.SaveChanges();
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else return Json(false, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }


        }
        public JsonResult XoaDD(string idBook)
        {
            try
            {
                int _idSach = Convert.ToInt32(idBook);
                int _idTk = Convert.ToInt32(Session["Id"]);
                var x = _db.DanhDau.FirstOrDefault(n => n.MaTaiKhoan == _idTk && n.MaSach == _idSach);
                _db.DanhDau.Remove(x);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }

}