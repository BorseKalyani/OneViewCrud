using OneViewCrud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace OneViewCrud.Controllers
{
    public class lolcController : Controller
    {
        DemoEntities db = new DemoEntities();
        // GET: lolc
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult save(record rec)
        {
            bool status = false;
            if (ModelState.IsValid ==true)
            {
                if (rec.id > 0)
                {
                    var v = db.records.Where(x => x.id == rec.id).FirstOrDefault();
                    if (v != null)
                    {
                        v.coursename = rec.coursename;
                        v.fee = rec.fee;
                        db.Entry(v).State = EntityState.Modified;
                    }
                }
                else
                {
                    db.records.Add(rec);

                }
                    db.SaveChanges();       
                    status = true;

            }
            else
            {
                ViewBag.ErrorMessage = "<script>alert('Enter UserName or Fee')</script>";
            }
            return new JsonResult { Data = new { status = status } };
        }
        public ActionResult GetCourses()
        {
            var courses = db.records.ToList();
            return Json(new { data = courses }, JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public JsonResult Edit(int Id)
        {
            var course = db.records.Where(x => x.id == Id).FirstOrDefault();
            return Json(course, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Remove(int Id)
        {
            bool status = false;
            var course = db.records.FirstOrDefault(x => x.id == Id);
            if (course != null)
            {
                db.records.Remove(course);
                db.SaveChanges();
                status = true;
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}