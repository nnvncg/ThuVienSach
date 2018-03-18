using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
using System.Data.Entity;

namespace QuanLyThuVien2.Controllers
{
    public class DonMuonAdminController : Controller
    {
        // GET: DonMuonAdmin
        ThuVienSachEntities db = new ThuVienSachEntities();
        public ActionResult DonMuon()
        {
            return View();
        }
        public JsonResult DanhSach()
        {
            return Json(db.DonHang.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChiTiet(int id)
        {
            return Json(db.DonHang.FirstOrDefault(n => n.MaDonHang == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChiTietDonMuon(int id)
        {
            return Json(db.ChiTietDonHang.Where(n => n.MaDonHang == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult QuaHan()
        {
            DateTime now = DateTime.Now;
            return Json(db.DonHang.Where(n => n.NgayTra < now), JsonRequestBehavior.AllowGet);
        }
        public JsonResult TimTheoNgay(DateTime dt, int loai)
        {
            if (loai == 1)
            {
                var ds = db.DonHang.Where(n => n.NgayMuon.Day == dt.Day && n.NgayMuon.Month == dt.Month && n.NgayMuon.Year == dt.Year).ToList();
                return Json(ds, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var ds = db.DonHang.Where(n => n.NgayTra.Day == dt.Day && n.NgayTra.Month == dt.Month && n.NgayTra.Year == dt.Year).ToList();
                return Json(ds, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult TimTheoTK(string tuKhoa)
        {
            var tk = db.TaiKhoan.Where(n => n.HoVaTen.Contains(tuKhoa) || n.Email.Contains(tuKhoa)).ToList();
            List<int> maTK = new List<int>();
            foreach (var item in tk)
            {
                maTK.Add(item.MaTaiKhoan);
            }
            var x = DonHangTheoTK(maTK);
            return Json(x, JsonRequestBehavior.AllowGet);
        }
        public List<DonHang> DonHangTheoTK(List<int> tk)
        {
            List<DonHang> dh = new List<DonHang>();
            if (tk.Count() != 0)
            {
                foreach (var item in tk)
                {
                    var ds = db.DonHang.Where(n => n.MaTaiKhoan == item).ToList();
                    foreach (var x in ds)
                    {
                        dh.Add(x);
                    }
                }
            }
            return dh;
        }
        public JsonResult Sua(DonHang dh)
        {
            try
            {
                var check = db.TaiKhoan.FirstOrDefault(n => n.MaTaiKhoan == dh.MaTaiKhoan);
            if (check == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            var dh2 = db.DonHang.FirstOrDefault(n => n.MaDonHang == dh.MaDonHang);
            dh2.MaTaiKhoan = dh.MaTaiKhoan;
            dh2.NgayTra = dh.NgayTra;
            dh2.GhiChu = dh.GhiChu;
            dh2.TinhTrangTra = dh.TinhTrangTra;
            db.Entry(dh2).State = EntityState.Modified;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult Them(DonHang dh, ChiTietDonHang[] chiTiet)
        {
            try
            {
                dh.NgayMuon = DateTime.Now;
                dh.TinhTrangTra = 2;
                db.DonHang.Add(dh);
                foreach (var x in chiTiet)
                {
                    x.MaDonHang = dh.MaDonHang;
                    db.ChiTietDonHang.Add(x);
                }
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult Xoa(DonHang dh)
        {
            try
            {
                var ct = db.ChiTietDonHang.Where(n => n.MaDonHang == dh.MaDonHang).ToList();
                foreach (var item in ct)
                {
                    db.ChiTietDonHang.Remove(item);
                    db.SaveChanges();
                }
                var x = db.DonHang.FirstOrDefault(n => n.MaDonHang == dh.MaDonHang);
                db.DonHang.Remove(x);
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