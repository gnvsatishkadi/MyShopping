using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GRDataFacade.Interface;
using GRDataFacade.BusinessLayer;
using GRDataModel;

namespace GenericRepositoryCodeFirst.Controllers
{
    public class ClothController : Controller
    {
        #region cloths
        IClothProductsBO _cloth = null;

        public ClothController(IClothProductsBO _cloth)
        {
            this._cloth = _cloth;
        }

        public ClothController()
        {
            this._cloth = new ClothProductsBO();
        }
        #endregion cloths

        //Insert Cloths into Database

        [HttpPost]
        public ActionResult Cloths(ClothProducts clothprod)
        {
            _cloth.InsertNewCloths(clothprod);
            return View();
        }

        //GetAllCloths
        public ActionResult GetAllCloths()
        {
            var cloths = _cloth.GetAllCloths();
            return View(cloths);
        }


        //Get MenCloth Products

        public ActionResult MenClothsWorld(string Category )
        {
            return View();
        }
    }
}
