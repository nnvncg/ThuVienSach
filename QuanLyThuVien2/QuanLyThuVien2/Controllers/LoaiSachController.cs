using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
using PagedList;
using PagedList.Mvc;

namespace QuanLyThuVien2.Controllers
{
    public class LoaiSachController : Controller
    {
        // GET: LoaiSach
        ThuVienSachEntities _db = new ThuVienSachEntities();
        public ActionResult Index()
        {
            return View(_db.ChuDe.Take(6).OrderByDescending(n=>n.TenChuDe).ToList());
        }
        public PartialViewResult TatCaChuDe()
        {
            return PartialView(_db.ChuDe.OrderByDescending(n => n.TenChuDe).ToList());
        }
        public ActionResult SachTheoChuDe(int id, int? page)
        {
            ViewBag.Id = id;
            ViewBag.ChuDe = _db.ChuDe.FirstOrDefault(n => n.MaChuDe == id).TenChuDe;
            int pageNumber = (page ?? 1);
            int pageSize = 9;
            return View(_db.Sach.Where(n=>n.MaChuDe==id).OrderByDescending(n => n.LuotXem).ToPagedList(pageNumber, pageSize));
        }
        public JsonResult Chitiet(int id)
        {
            return Json(_db.Sach.FirstOrDefault(n => n.MaSach == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Xoa(int id)
        {
            Sach sach = _db.Sach.FirstOrDefault(n => n.MaSach == id);
            if (sach == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    _db.Sach.Remove(sach);
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
}