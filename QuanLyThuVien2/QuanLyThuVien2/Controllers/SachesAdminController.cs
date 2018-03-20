using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using QuanLyThuVien2.Models;
using System.IO;
using System.Web.Helpers;

namespace QuanLyThuVien2.Controllers
{
    public class SachesAdminController : Controller
    {
        private ThuVienSachEntities db = new ThuVienSachEntities();

        // GET: SachesAdmin
        public ActionResult Index()
        {
            if (Session["Login"] == null)
            {
                return Redirect("/TaiKhoanAdmin/Login");
            }
            return View();
        }

        public JsonResult AllBook()
        {
            return Json(db.Sach.OrderByDescending(n => n.NgayCapNhat).Where(n => n.KichHoat == true).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChiTiet(int id)
        {
            return Json(db.Sach.FirstOrDefault(n => n.MaSach == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Xoa(int id)
        {
            try
            {
                Sach s = db.Sach.FirstOrDefault(n => n.MaSach == id);
                s.KichHoat = false;
                db.Entry(s).State = EntityState.Modified;
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult AddBook(Sach sach, HttpPostedFileBase Image)
        {
                string fileName = null;
                if (Image != null && Image.ContentLength > 0)
                {
                    if (Image.FileName.Contains(".jpg") || Image.FileName.Contains(".png"))
                    {
                        try
                        {
                            fileName = Guid.NewGuid() + "." + Image.FileName.Split('.')[1];
                            string path = Path.Combine(Server.MapPath("~/Content/img/Sach/"), fileName);
                            //chinh kich thuoc
                            WebImage img = new WebImage(Image.InputStream);
                            img.Resize(650, 430);
                            img.Save(path);
                            sach.AnhBia = fileName;

                        }
                        catch
                        {
                            sach.AnhBia = "";
                        }

                    }
                }
                else
                {
                    sach.AnhBia = "";
                }
                sach.NgayCapNhat = DateTime.Now;
                sach.LuotXem = 0;
                sach.KichHoat = true;
                db.Sach.Add(sach);
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult EditBook(Sach sach, HttpPostedFileBase Image)
        {
            string fileName = null;
            if (Image != null && Image.ContentLength > 0)
            {
                if (Image.FileName.Contains(".jpg") || Image.FileName.Contains(".png"))
                {
                    try
                    {
                        fileName = Guid.NewGuid() + "." + Image.FileName.Split('.')[1];
                        string path = Path.Combine(Server.MapPath("~/Content/img/Sach/"), fileName);
                        //chinh kich thuoc
                        WebImage img = new WebImage(Image.InputStream);
                        img.Resize(650, 430);
                        img.Save(path);
                        Sach sach2 = db.Sach.FirstOrDefault(n => n.MaSach == sach.MaSach);

                        FileInfo file = new FileInfo(Server.MapPath("~/Content/img/Sach/" + sach2.AnhBia));
                        if (file.Exists)
                        {
                            file.Delete();
                        }
                        if (sach2 != null)
                        {
                            db.Entry(sach2).State = EntityState.Detached;
                        }
                        sach.AnhBia = fileName;

                    }
                    catch
                    {
                        sach.AnhBia = "";
                    }

                }
            }
            else
            {
                sach.AnhBia = "";
            }
            sach.NgayCapNhat = DateTime.Now;
            db.Entry(sach).State =EntityState.Modified;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}
