using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GRDataFacade.BusinessLayer;
using GRDataFacade.Interface;
using GRDataModel;

namespace GenericRepositoryCodeFirst.Controllers
{
    public class PaytmController : Controller
    {
        #region constructor ref
        IPaytmCustomersBO _paytmBo = null;
        IPaytmLoginBO _loginBo = null;
        ICountrysBO _countryBo = null;

        public PaytmController(IPaytmCustomersBO _paytmBo)
        {
            this._paytmBo = _paytmBo;
        }

        public PaytmController()
        {
            _paytmBo = new PaytmCustomersBO();
            _loginBo = new PaytmLoginBO();
            _countryBo = new CountrysBO();
        }

        #endregion

        //Landing Action
        [HttpGet]
        public ActionResult Landing()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Land()
        {
            return View();
        }
        //GetAll Results
        public ActionResult GetAll()
        {
            var data = _paytmBo.GetAllPaytmsCus();
            return View(data);
        }

        //Insert
        public ActionResult Insert(PaytmCustomers paytm)
        {
            _paytmBo.NewPaytmCus(paytm);
            return View();
        }

        //GetById
        public ActionResult GetById(string Username, string Email)
        {
            var data = _paytmBo.GetPaytmCusById(Username, Email);
            return View(data);
        }

        //UpdatePaytm
        public ActionResult UpdatePaytm(PaytmCustomers paytm)
        {
            _paytmBo.UpdatePaytmCus(paytm);
            return View();
        }

        //Delete
        public ActionResult Delete(PaytmCustomers paytm)
        {
            _paytmBo.DeletePaytmCus(paytm);
            return View();
        }

        //LoginHere
        public ActionResult Login(PaytmLogin login)
        {
            _loginBo.LoginUser(login.UserName, login.Password);
            return View();
        }

        //ForgetPassword
        public ActionResult ForgetPass(PaytmCustomers paytm)
        {
            _loginBo.ForgetPassword(paytm.Email, paytm.Question, paytm.Answer);
            return View();
        }

        //Dynamically Rendering Partial View Pages
        [HttpGet]
        public PartialViewResult DynamicPartials(string Category)
        {
            string partialView = null;
            switch (Category)
            {
                case ("Mobiles"):
                    {
                        partialView = "_MobilesPartial";
                        break;
                    }
                case ("Cloths"):
                    {
                        partialView = "_ClothsPartial";
                        break;
                    }
                case ("Electronics"):
                    {
                        partialView = "_ElectronicsPartial";
                        break;
                    }
                case ("FootWares"):
                    {
                        partialView = "_FootWaresPartial";
                        break;
                    }

                case ("Kitchen"):
                    {
                        partialView = "_KitchenPartial";
                        break;
                    }
                case ("Books"):
                    {
                        partialView = "_BooksPartial";
                        break;
                    }
                default:
                    {
                        partialView = "_HomepagePartial";
                        break;
                    }
            }
            return PartialView(partialView);
        }

        //Landing Page controller
        public ActionResult Paytm()
        {
            return View();
        }
    }
}
