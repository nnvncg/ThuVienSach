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
    public class NhaXBController : Controller
    {
        // GET: NhaXB
        ThuVienSachEntities _db = new ThuVienSachEntities();

        public ActionResult Index()
        {
            return View(_db.NhaXuatBan.Take(8).OrderByDescending(n => n.TenNXB).ToList());
        }
        public PartialViewResult DanhSachNXB()
        {
            return PartialView(_db.NhaXuatBan.OrderByDescending(n => n.TenNXB).ToList());
        }
        public ActionResult SachTheoNXB(int id, int? page)
        {
            ViewBag.Id = id;
            ViewBag.NhaXB = _db.NhaXuatBan.FirstOrDefault(n => n.MaNXB == id).TenNXB;
            int pageNumber = (page ?? 1);
            int pageSize = 9;
            return View(_db.Sach.Where(n => n.MaChuDe == id).OrderByDescending(n => n.LuotXem).ToPagedList(pageNumber, pageSize));
        }
    }
}