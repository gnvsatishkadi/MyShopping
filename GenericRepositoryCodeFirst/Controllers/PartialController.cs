using GRDataFacade.BusinessLayer;
using GRDataFacade.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GenericRepositoryCodeFirst.Controllers
{
    public class PartialController : Controller
    {
        #region constructor ref
        IPaytmCustomersBO _paytmBo = null;
        IPaytmLoginBO _loginBo = null;
        ICountrysBO _countryBo = null;

        public PartialController(IPaytmCustomersBO _paytmBo)
        {
            this._paytmBo = _paytmBo;
        }

        public PartialController()
        {
            _paytmBo = new PaytmCustomersBO();
            _loginBo = new PaytmLoginBO();
            _countryBo = new CountrysBO();
        }

        #endregion

        public PartialViewResult _ClothsPartial()
        {
            var category = _countryBo.GetClothCategory();
            return PartialView(category);
        }

    }
}
