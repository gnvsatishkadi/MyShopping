using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GRDataFacade.BusinessLayer;
using GRDataFacade.Interface;
using GRDataModel;
using System.Web.UI;

namespace GenericRepositoryCodeFirst.Controllers
{
    public class ShopController : Controller
    {

        #region constructor ref

        ICountrysBO _countryBo = null;
        IClothCategoryBO _clothCategoryBo = null;

        public ShopController(ICountrysBO _countryBo, IClothCategoryBO _clothCategoryBo)
        {
            this._countryBo = _countryBo;
            this._clothCategoryBo = _clothCategoryBo;
        }

        public ShopController()
        {
            _countryBo = new CountrysBO();
            _clothCategoryBo = new ClothCategoryBO();
        }

        #endregion

        //ViewModalClass
        public class F
        {
            public int ItemId { get; set; }
            public string Brand { get; set; }
            public string Color { get; set; }
            public string Material { get; set; }
            public string Size { get; set; }
            public string NeckType { get; set; }
            public string Fit { get; set; }
        }


        //Add item to Cart  MODEL CLASS
        public class ClothProductCartItems
        {
            public int ItemId { get; set; }
            public string Username { get; set; }
            public string OrderDate { get; set; }
            public int ItemSize { get; set; }
            public int ItemCount { get; set; }
            public int ItemCost { get; set; }
            public int DelivaryPincode { get; set; }
            public string Address1 { get; set; }
            public string Address2 { get; set; }
            public string Mobile { get; set; }
            public string LandMark { get; set; }
            public int ShippingCharges { get; set; }
            public int ExpDelDate { get; set; }
        }

        //Home
        public ActionResult Home()
        {
            return View();
        }

        //MenCloth
        public ActionResult MenCloth()
        {
            return View();
        }

        //Error
        public ActionResult Error()
        {
            return View();
        }

        //GetAllProductTypes Landing Result
        public JsonResult GetAllProductTypes()
        {
            var productTypes = _countryBo.GetProductTypes();
            return Json(productTypes, JsonRequestBehavior.AllowGet);
        }

        //Gender By Select Cloth Product Type
        public JsonResult GetGenderBySelProdType(int prodid)
        {
            var category = _countryBo.GetClothCategory();
            var gender = category.Where(x => x.ProdID == prodid).Select(x => new { x.Gender }).Distinct().ToList();
            return Json(gender, JsonRequestBehavior.AllowGet);
        }

        //GetClothCategory
        public JsonResult GetCategoryBySelGender(string Gender)
        {

            var category = _countryBo.GetClothCategory();
            var cate = (from c in category
                        where c.Gender == Gender
                        group c by new { c.Category, c.CategoryId }
                            into cc
                            select cc.First());

            //imp code here
            //var catelist = category.Where(x => x.Gender == Gender).Select(x => new { x.Category,x.ProdID }).Distinct().ToList();
            return Json(cate, JsonRequestBehavior.AllowGet);
        }

        //GetSizeContent
        public JsonResult GetSize(int CategoryId)
        {
            var ClothSize = _countryBo.GetClothSize();
            var SizeCloth = _clothCategoryBo.GetSizeClothProducts();

            var Size = (from CS in ClothSize
                        join SC in SizeCloth
                        on CS.SizeRefId equals SC.SizeId
                        where CS.CategoryId == CategoryId
                        select new { CS.SizeRefId, SC.Size }).Distinct().ToList();
            return Json(Size, JsonRequestBehavior.AllowGet);
        }

        //GetBrandContent
        public JsonResult GetBrand(int CategoryId)
        {
            var ClothBrand = _countryBo.GetClothBrands();
            var BrandCloth = _clothCategoryBo.GetBrandClothProducts();

            var Brand = (from CB in ClothBrand
                         join BC in BrandCloth
                         on CB.BrandRefId equals BC.BrandId
                         where CB.CategoryId == CategoryId
                         select new { CB.BrandRefId, BC.BrandName }).Distinct().ToList();
            return Json(Brand, JsonRequestBehavior.AllowGet);
        }

        //GetNecktypeContent
        public JsonResult GetNecktype(int CategoryId)
        {
            var ClothNeck = _countryBo.GetClothNeckType();
            var NeckCloth = _clothCategoryBo.GetNecktypeClothProducts();

            var Necktype = (from CN in ClothNeck
                            join NC in NeckCloth
                            on CN.NeckTypeRefId equals NC.NeckId
                            where CN.CategoryId == CategoryId
                            select new { CN.NeckTypeRefId, NC.NeckType }).Distinct().ToList();
            return Json(Necktype, JsonRequestBehavior.AllowGet);
        }

        ////GetSleevesContent
        public JsonResult GetSleeves(int CategoryId)
        {
            var ClothSleeves = _countryBo.GetClothSleeves();
            var SleevesCloth = _clothCategoryBo.GetSleevesClothProducts();

            var Sleeves = (from CSl in ClothSleeves
                           join SlC in SleevesCloth
                           on CSl.SlevesRefId equals SlC.SlevesId
                           where CSl.CategoryId == CategoryId
                           select new { CSl.SlevesRefId, SlC.SlevesType }).Distinct().ToList();
            return Json(Sleeves, JsonRequestBehavior.AllowGet);
        }

        //GetFitContent
        public JsonResult GetFit(int CategoryId)
        {
            var ClothFit = _countryBo.GetClothFit();
            var FitCloth = _clothCategoryBo.GetFitClothProducts();

            var Fit = (from CS in ClothFit
                       join SC in FitCloth
                        on CS.FitRefId equals SC.FitId
                       where CS.CategoryId == CategoryId
                       select new { CS.FitRefId, SC.FitType }).Distinct().ToList();
            return Json(Fit, JsonRequestBehavior.AllowGet);
        }

        //GetColor
        public JsonResult GetColor(int CategoryId)
        {
            var ClothColor = _countryBo.GetClothColor();
            var ColorCloth = _clothCategoryBo.GetColorClothProducts();

            var color = (from C in ClothColor
                         join S in ColorCloth
                          on C.ColorRefId equals S.ColorId
                         where C.CategoryId == CategoryId
                         select new { C.ColorRefId, S.ColorName }).Distinct().ToList();
            return Json(color, JsonRequestBehavior.AllowGet);
        }

        //GetMaterials
        public JsonResult GetMaterials(int CategoryId)
        {
            var ClothMaterials = _countryBo.GetClothMaterial();
            var MaterialCloth = _clothCategoryBo.GetMaterialClothProducts();

            var Material = (from C in ClothMaterials
                            join S in MaterialCloth
                             on C.MatRefId equals S.MatId
                            where C.CategoryId == CategoryId
                            select new { C.MatRefId, S.MaterialType }).Distinct().ToList();
            return Json(Material, JsonRequestBehavior.AllowGet);
        }

        //GetOccasion
        public JsonResult GetOccasion(int CategoryId)
        {
            var ClothOccasion = _countryBo.GetClothOccasion();
            var OccasionCloth = _clothCategoryBo.GetOccasionClothProducts();

            var Material = (from C in ClothOccasion
                            join S in OccasionCloth
                             on C.OccasionRefId equals S.OccasionId
                            where C.CategoryId == CategoryId
                            select new { C.OccasionRefId, S.OccasionType }).Distinct().ToList();
            return Json(Material, JsonRequestBehavior.AllowGet);
        }

        //DashboardCloth
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CategoryId">Used to Receive  the products by user  selected item
        /// </param>
        /// <returns></returns>
        public JsonResult GetDashboardCloth(int CategoryId)
        {
            var Dashboardcloth = _clothCategoryBo.AvailableDashboardCloth();
            var Dashboard = from d in Dashboardcloth where d.CategoryId == CategoryId select d;
            return Json(Dashboard, JsonRequestBehavior.AllowGet);
        }

        //GetSelectedDBProduct
        public JsonResult GetSelectedDBProduct(int ItemId)
        {
            try
            {
                List<DashboardCloth> DBC = new List<DashboardCloth>();
                List<DashBoardClothImages> DBCI = new List<DashBoardClothImages>();

                var SelectedDBProduct = _clothCategoryBo.AvailableDashboardCloth();
                var Dashboardclothimages = _clothCategoryBo.DashBoardClothImages();

                var finalDBProduct = from d in SelectedDBProduct where d.ItemId == ItemId select d;

                //Information for Size
                var Brand = (from d in finalDBProduct select d.Brand).Distinct().Single();
                var Color = (from d in finalDBProduct select d.Color).Distinct().Single();
                var Necktype = (from d in finalDBProduct select d.NeckType).Distinct().Single();
                var Sleeves = (from d in finalDBProduct select d.Sleeves).Distinct().Single();
                var Fit = (from d in finalDBProduct select d.Fit).Distinct().Single();
                //Geting Size data


                var ProductSize = (from s in SelectedDBProduct
                                   where s.Brand == Brand
                                   where s.Color == Color
                                   where s.Sleeves == Sleeves
                                   where s.Fit == Fit
                                   where s.NeckType == Necktype
                                   select new { s.Size, s.CategoryId }).Distinct().ToList();

                var finalDBImages = from d in Dashboardclothimages where d.ItemId == ItemId select d;

                //Create Duplicate var for Passing two more objects data to view
                var FinalSelectedData = new
                {
                    DB = finalDBProduct,
                    DBI = finalDBImages,
                    DBSize = ProductSize
                };


                return Json(FinalSelectedData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        //GetSelectedDashBoardSize
        public JsonResult GetSelectedDashBoardSize(F Dashboard)
        {
            return Json(null, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Pincode is available or not Checking
        /// </summary>
        /// <param name="pin"></param>
        /// <returns></returns>
        public JsonResult PinAvailOrNOtChecking(int pin)
        {
            DelivaryAvails pinresult = new DelivaryAvails();

            pinresult = _clothCategoryBo.CheckPincodeAvailOrNot(pin);

            return Json(pinresult, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// ProductCount is Checking for availability
        /// </summary>
        /// <returns></returns>
        public JsonResult ProductCountAvailOrNotChecking(int ItemId)
        {
            var ProductCount = 0;
            try
            {
                var data = _clothCategoryBo.CheckProductCount(ItemId);
                if (data.ProductCount > 0)
                {
                    ProductCount = data.ProductCount;
                    return Json(ProductCount, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    ProductCount = 0;
                    return Json(ProductCount, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                ProductCount = 0;
                return Json(ProductCount, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
