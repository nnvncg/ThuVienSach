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
    public class HomeController : Controller
    {
        // GET: Home
        ThuVienSachEntities _db = new ThuVienSachEntities();
        public ActionResult Home(int? page)
        {
            int pageNumber = (page ?? 1);
            int pageSize = 9;
            return View(_db.Sach.OrderByDescending(n=>n.LuotXem).ToPagedList(pageNumber, pageSize));
        }
        public ActionResult Home2()
        {
            return View();
        }
        public PartialViewResult SachMoi()
        {
            return PartialView(_db.Sach.OrderByDescending(n=>n.NgayCapNhat).Take(3).ToList());
        }
    }
}