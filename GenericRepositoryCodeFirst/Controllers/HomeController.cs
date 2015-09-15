using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using GRDataFacade;
using GRDataFacade.BusinessLayer;
using GRDataFacade.Interface;
using System.ComponentModel;
using GRDataModel;


namespace GenericRepositoryCodeFirst.Controllers
{
    public class HomeController : Controller
    {
        #region Ref
        IRegisterBO _registerBO = null;
        public HomeController(IRegisterBO _registerBO)
        {
            this._registerBO = _registerBO;
        }

        public HomeController()
        {
            this._registerBO = new RegisterBO();
        }
        #endregion Ref

        //Index method 
        public ActionResult Index()
        {
            var register = _registerBO.GetAllRegister();
            return View(register);
        }

        //Insert new Record Getmethod
        [HttpGet]
        public ActionResult InsertNew()
        {
            return View();
        }

        //Insert
        [HttpPost]
        public ActionResult InsertNew(RepRegister rep)
        {
            _registerBO.NewRegister(rep);
            return RedirectToAction("Index", "Home");
        }

        //UpdateRegister
        [HttpGet]
        public ActionResult Updates(int id)
        {
            var model = _registerBO.GetRegById(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Updates(RepRegister rep)
        {
            _registerBO.UpdateRegister(rep);
            return RedirectToAction("Index", "Home");
        }

        //Delete
        [HttpGet]
        public ActionResult Delete(int id)
        {
            var model = _registerBO.GetRegById(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Deletes(int id)
        {
            var model = _registerBO.GetRegById(id);
            _registerBO.DeleteRegister(model);
            return RedirectToAction("Index", "Home");
        }


        public ActionResult LandLogin()
        {
            return View();
        }

        //FileUploadController
    }
}
