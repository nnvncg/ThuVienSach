using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
namespace QuanLyThuVien2.Controllers
{
    public class DonMuonController : Controller
    {
        // GET: DonMuon
        ThuVienSachEntities _db = new ThuVienSachEntities();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult XoaDonHang(string id)
        {
            try
            {
                int _id = Convert.ToInt32(id);
                var dh = _db.DonHang.FirstOrDefault(n => n.MaDonHang == _id);
                _db.DonHang.Remove(dh);
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