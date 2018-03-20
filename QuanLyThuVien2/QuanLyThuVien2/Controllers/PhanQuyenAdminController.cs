using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
namespace QuanLyThuVien2.Controllers
{
    public class PhanQuyenAdminController : Controller
    {
        // GET: PhanQuyenAdmin
        ThuVienSachEntities db = new ThuVienSachEntities();
        public ActionResult PhanQuyen()
        {
            if (Session["Login"] == null)
            {
                return Redirect("/TaiKhoanAdmin/Login");
            }
            return View();
        }
        public JsonResult DanhSachQuyen()
        {
            return Json(db.Quyen.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ThemPhanQuyen(int ltk, int Quyen)
        {
            try
            {
                var pq = new PhanQuyen();
                pq.MaLoaiTK = ltk;
                pq.MaQuyen = Quyen;
                pq.KichHoat = true;
                db.PhanQuyen.Add(pq);
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult DanhSach(int ltk)
        {
            return Json(db.PhanQuyen.Where(n => n.MaLoaiTK == ltk).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult DanhSachChuaChon(int id)
        {
            
            var ds = db.PhanQuyen.Where(n => n.MaLoaiTK == id).ToList();
            var list = db.Quyen.ToList();
            foreach (var item in ds)
            {
                int index = list.FindIndex(n => n.MaQuyen == item.MaQuyen);
                list.RemoveAt(index);
            }            
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult XoaPhanQuyen(int ltk, int quyen)
        {
            try
            {
                var pq = db.PhanQuyen.FirstOrDefault(n => n.MaLoaiTK == ltk && n.MaQuyen == quyen);
                db.PhanQuyen.Remove(pq);
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult KiemTra(int ltk, int quyen)
        {
            var x = db.PhanQuyen.Where(n => n.MaLoaiTK == ltk && (n.MaQuyen == quyen || n.MaQuyen == 39)).ToList();
            if (x.Count() != 0)
            {
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);

            }
        }
    }
}