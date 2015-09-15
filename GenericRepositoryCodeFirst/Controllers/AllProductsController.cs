using GRDataFacade.BusinessLayer;
using GRDataFacade.Interface;
using GRDataModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GRDataLayer;

namespace GenericRepositoryCodeFirst.Controllers
{
    public class AllProductsController : Controller
    {
        #region constructor ref
        IPaytmCustomersBO _paytmBo = null;
        IPaytmLoginBO _loginBo = null;
        ICountrysBO _countryBo = null;
        IClothCategoryBO _clothCategoryBo = null;
        GRDBContext DBcontext;

        public AllProductsController(IPaytmCustomersBO _paytmBo, IClothCategoryBO _clothCategoryBo, ICountrysBO _countryBo, GRDBContext DBcontext)
        {
            this._paytmBo = _paytmBo;
            this._clothCategoryBo = _clothCategoryBo;
            this._countryBo = _countryBo;
            this.DBcontext = DBcontext;
        }

        public AllProductsController()
        {
            _paytmBo = new PaytmCustomersBO();
            _loginBo = new PaytmLoginBO();
            _countryBo = new CountrysBO();
            _clothCategoryBo = new ClothCategoryBO();
            DBcontext = new GRDBContext();
        }

        #endregion


        //ViewModal
        public class InsertProduct
        {
            public HttpPostedFileBase Files { get; set; }
            public int ItemId { get; set; }
            public int CategoryId { get; set; }
            public string Size { get; set; }
            public string Brand { get; set; }
            public string Color { get; set; }
            public string Sleeves { get; set; }
            public string Fit { get; set; }
            public string Material { get; set; }
            public string Status { get; set; }
            public string Occasion { get; set; }
            public string FilePath { get; set; }
            public string FileName { get; set; }
            public string NeckType { get; set; }
            public int ProdId { get; set; }
            public double ProductCost { get; set; }
            public string IsDiscountAvail { get; set; }
            public int DiscountPercent { get; set; }
            public double AfterDiscountCost { get; set; }
            public int ProductCount { get; set; }
            public string ProductDescription { get; set; }
        }
        //ViewModel LoginModel
        public class LoginModel
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public string EmailId { get; set; }
            public string Mobile { get; set; }
            public string FormType { get; set; }
        }

        //PurchaseOrderModel
        public class POModel
        {
            public string POId { get; set; }
            public string PODate { get; set; }
            public string POTime { get; set; }
            public string OrderedBy { get; set; }
            public string MobileNumber { get; set; }
            public string EmailId { get; set; }
            public string PODeliveryDate { get; set; }
            public string POShippingVia { get; set; }
            public int POShowPrice { get; set; }
            public int PODeliveryCharge { get; set; }
            public int POAmount { get; set; }
            public string PODeliveryType { get; set; }
            public string POBackStatus { get; set; }

            public int PinCode { get; set; }
            public string ReceiverName { get; set; }
            public string PrimaryAddress { get; set; }
            public string Area { get; set; }
            public string District { get; set; }
            public string AlterMobileNumber { get; set; }
            public string PaymentDivison { get; set; }
            public int ShippingCharges { get; set; }
            public string FilePath { get; set; }
            public string FileName { get; set; }
        }

        //PurchaseOrderDetailsModel
        public class PODModel
        {
            public string POId { get; set; }
            public string PODate { get; set; }
            public string POTime { get; set; }
            public string EmailId { get; set; }
            public string PODeliveryDate { get; set; }
            public string PODeliveryType { get; set; }
            public string POShippingVia { get; set; }
            public int POItemId { get; set; }
            public int POItemSize { get; set; }
            public int POItemCost { get; set; }
            public int POItemCount { get; set; }
            public int POAmount { get; set; }
            public string POBackStatus { get; set; }
            public string POReturnWithInDate { get; set; }
        }

        //SignUPModel
        public class NewUserReg
        {
            public string UserName { get; set; }
            public string Mobile { get; set; }
            public string EmailId { get; set; }
            public string Password { get; set; }
            public string FormType { get; set; }
        }

        //ItemsModel
        public class ItemsModel
        {
            public int ItemId { get; set; }
            public string ItemSize { get; set; }
            public int ItemCost { get; set; }
            public int ShippingCharges { get; set; }
            public int ItemsCost { get; set; }
            public string ProductDescription { get; set; }
            public int WantedItemsCount { get; set; }
            public string Seller { get; set; }
        }

        //UploadProducts
        [HttpGet]
        public ActionResult UploadProducts()
        {
            return View();
        }

        //GetCountrys
        public JsonResult GetCountrys()
        {
            var countrys = _countryBo.GetCountrys();
            return Json(countrys, JsonRequestBehavior.AllowGet);
        }

        //GetStates
        public JsonResult GetStatesByCountryId(int countryId)
        {
            var states = _countryBo.GetStates(countryId);
            var state = states.Where(x => x.CountrysId == countryId).Select(x => new { x.StatesId, x.StateName }).ToList();
            return Json(state, JsonRequestBehavior.AllowGet);
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

        public JsonResult GetGenderBySelProdTypeFootWare(int prodid)
        {
            return Json(null, JsonRequestBehavior.AllowGet);
        }

        //Gender by Select FootWares Product Type

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

        //GetClothBrands
        public JsonResult GetBrands(int CategoryId)
        {
            var Brands = _countryBo.GetClothBrands();
            var Brand = Brands.Where(b => b.CategoryId == CategoryId).GroupBy(b => b.BrandName).Select(b => b.First()).ToList();
            return Json(Brand, JsonRequestBehavior.AllowGet);
        }

        //GetNeckTypes
        public JsonResult GetNeckTypes(int CategoryId)
        {
            var NeckTypes = _countryBo.GetClothNeckType();
            var Neck = NeckTypes.Where(n => n.CategoryId == CategoryId).GroupBy(n => n.NeckType).Select(n => n.First()).ToList(); //.Select(n => new { n.CategoryId, n.NeckType }).Distinct().ToList();
            return Json(Neck, JsonRequestBehavior.AllowGet);
        }

        //GetClothFit
        public JsonResult GetClothFit(int CategoryId)
        {
            var ClothFit = _countryBo.GetClothFit();
            var Fit = ClothFit.Where(f => f.CategoryId == CategoryId).Select(f => new { f.FitRefId, f.FitType }).Distinct().ToList();
            return Json(Fit, JsonRequestBehavior.AllowGet);
        }

        //GetClothSleeves
        public JsonResult GetClothSleeves(int CategoryId)
        {
            var ClothSleeves = _countryBo.GetClothSleeves();
            var Sleeves = ClothSleeves.Where(s => s.CategoryId == CategoryId).GroupBy(s => s.SlevesType).Select(s => s.First()).ToList();
            return Json(Sleeves, JsonRequestBehavior.AllowGet);
        }

        //GetClothColor
        public JsonResult GetClothColor(int CategoryId)
        {
            var ClothColor = _countryBo.GetClothColor();
            var Color = ClothColor.Where(c => c.CategoryId == CategoryId).Select(c => new { c.ColorRefId, c.ColorName }).Distinct().ToList();
            return Json(Color, JsonRequestBehavior.AllowGet);
        }

        //Get DynClothData
        public JsonResult GetDataBySelectingIcons()
        {
            //string Gender = "Male";
            var category = _countryBo.GetClothCategory();
            // var cate = (from c in category
            //           where c.Gender == Gender
            //          group c by new { c.Category, c.CategoryId }
            //             into cc
            //            select cc.First());

            return Json(category, JsonRequestBehavior.AllowGet);
        }

        //Uploading Files
        //public List<HttpPostedFileBase> PostedPhotos = new List<HttpPostedFileBase>();
        public JsonResult UploadingFiles(InsertProduct FormData)
        {
            InsertProduct data = new InsertProduct();
            DashboardCloth dashboard = new DashboardCloth();
            data = FormData;
            bool result = false;

            try
            {

                if (data.Files != null && data.Files.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(data.Files.FileName);
                    //string filename = System.IO.Path.GetFileName(file.FileName);
                    //file.SaveAs(Server.MapPath(@"E:UsersProfiles\skadi\Documents\Visual Studio 2012\Projects\CodeFirstDemoApplication\Fileuploads" + filename));
                    string path = @"E:/UsersProfiles/skadi/Documents/Visual Studio 2012/Projects/CodeFirstDemoApplication/CodeFirstDemoApplication/Images/Clothing/Men";
                    string folderpath = "http://localhost:59259/Images/Clothing/Men/";

                    string s = Path.Combine(path, fileName);
                    FileInfo imagefile = new FileInfo(s);
                    result = imagefile.Exists;
                    if (result == false)
                    {
                        //string pPath = @"E:\UsersProfiles\skadi\UploadProducts\Cloths\Men\";
                        //string vPath = pPath.Replace(@"q:\quotewerks", "~").Replace(@"\", "/");

                        //int GivenDiscount = data.DiscountPercent;
                        //float OldPrice = data.ProductCost;
                        //string ISDiscount = data.IsDiscountAvail;
                        //float NewPrice = 0;
                        //GivenDiscount = Convert.ToInt32(GivenDiscount / 100);
                        //NewPrice = Convert.ToInt32(OldPrice - (OldPrice * GivenDiscount));

                        data.Files.SaveAs(Path.Combine(path, fileName));
                        dashboard.Brand = data.Brand;
                        dashboard.CategoryId = data.CategoryId;
                        dashboard.Color = data.Color;
                        dashboard.FileName = data.Files.FileName;
                        dashboard.FilePath = folderpath;
                        dashboard.Fit = data.Fit;
                        dashboard.Material = data.Material;
                        dashboard.NeckType = data.NeckType;
                        dashboard.Occasion = data.Occasion;
                        dashboard.ProdId = data.ProdId;
                        dashboard.Size = data.Size;
                        dashboard.Sleeves = data.Sleeves;
                        dashboard.Status = data.Status;
                        dashboard.ProductCost = data.ProductCost;
                        dashboard.IsDiscountAvail = data.IsDiscountAvail;
                        dashboard.DiscountPercent = data.DiscountPercent;
                        dashboard.ProductCount = data.ProductCount;
                        dashboard.AfterDiscountCost = data.AfterDiscountCost;
                        dashboard.ProductDescription = data.ProductDescription;

                        _clothCategoryBo.NewDashBoardProduct(dashboard);
                        //DBcontext.SaveChanges();
                    }
                    else
                    {
                        result = true;
                    }
                    //file.SaveAs(s);

                    //string filepathtosave = "Images/" + filename;
                    //file.SaveAs(filename);
                }
                //PostedPhotos.Add(FormData.Files);
            }
            catch (Exception ex)
            {
            }
            return Json(null, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Testing(DashboardCloth upload)
        {
            var name = "satish";
            return Json(name, JsonRequestBehavior.AllowGet);
        }



        //LoginUser Checking
        public JsonResult LoginUser(NewUserRegistration login)
        {
            var loginStatus = _paytmBo.GetAllUserRegistration().ToList();

            loginStatus = (from u in loginStatus
                           where u.EmailId == login.EmailId && u.Password == login.Password
                           //where u.Password == login.Password
                           select u).ToList();
            return Json(loginStatus, JsonRequestBehavior.AllowGet);
        }


        //New User Registration 
        public JsonResult NewSignUpData(NewUserRegistration SignupData)
        {
            var count = 0;
            try
            {
                //Retreving Existing Userinfo
                var loginStatus = _paytmBo.GetAllUserRegistration().ToList();
                loginStatus = (from u in loginStatus where u.EmailId == SignupData.EmailId select u).ToList();

                if (loginStatus.Count > 0)
                {
                    count = 0;
                    return Json(count, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    _paytmBo.NewSignUp(SignupData);
                    count = 1;
                    return Json(count, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                count = 0;
                return Json(count, JsonRequestBehavior.AllowGet);
            }
        }


        //
        public JsonResult UpdateUserProfileData(NewUserRegistration newdata)
        {
            int count = 0;
            try
            {
                _paytmBo.EditUserProfileData(newdata);
                count = 1;
                return Json(count, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                count = 0;
                return Json(count, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Used to Store POID in PurchaseOrder Table
        /// </summary>
        /// <param name="POrder">
        /// FormData
        /// </param>
        /// <returns>
        /// Count value , if Pass Count = 1 else Count=0
        /// </returns>
        public JsonResult InsertPurchaseData(PurchaseOrder POrder)
        {
            var count = 0;
            try
            {
                _paytmBo.PurchaseOrderData(POrder);
                count = 1;
                return Json(count, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                count = 0;
                return Json(count, JsonRequestBehavior.AllowGet);
            }

        }

        /// <summary>
        /// This Method is Used to Store "User Selected Items" individually
        /// Into PURCHASEORDERDETAILS Table
        /// </summary>
        /// <param name="items">
        /// Retriving All data In the form of FormData object</param>
        /// <returns>
        /// It returns Count value 
        /// if Pass Count = 1 else Count = 0
        /// </returns>
        public JsonResult InsertPurchaseOrderDetailsData(List<PurchaseOrderDetails> items)
        {
            int Count = 0;
            int TotalCount = 0;
            try
            {
                if (items.Count > 0)
                {
                    //Lop for Store All Data into PurchaseOrderDetails Table
                    for (int i = 0; i < items.Count; i++)
                    {
                        Count = PurchaseOrderRandomData(items[i]);
                        TotalCount = TotalCount + Count;
                    }
                    //Checking TotalCount value
                    if (TotalCount == items.Count)
                    {
                        Count = 1;
                        return Json(Count, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        Count = 0;
                        return Json(Count, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    Count = 0;
                    return Json(Count, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception ex)
            {
                Count = 0;
                return Json(Count, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// This mwthod is used to  maintain the status of the each item  individually
        /// Data stored into Tracking "TrackingOrderStatus" table
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        public JsonResult InsertTrackingOrderStatusData(List<TrackingOrderStatus> items)
        {
            int Count = 0;
            int TotalCount = 0;
            try
            {
                if (items.Count > 0)
                {
                    //Lop for Store All Data into PurchaseOrderDetails Table
                    for (int i = 0; i < items.Count; i++)
                    {
                        Count = TrackingOrderStatusRandomData(items[i]);
                        TotalCount = TotalCount + Count;
                    }
                    //Checking TotalCount value
                    if (TotalCount == items.Count)
                    {
                        Count = 1;
                        return Json(Count, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        Count = 0;
                        return Json(Count, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    Count = 0;
                    return Json(Count, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception ex)
            {
                Count = 0;
                return Json(Count, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Here We pass Data From "InsertPurchaseOrderDetailsData" to this Below Method 
        /// Just For Easy Coding
        /// </summary>
        /// <param name="pomodel">
        /// pomodel
        /// </param>
        /// <returns>
        /// Resul value either 1 or 0 Success/Failure
        /// </returns>
        public int PurchaseOrderRandomData(PurchaseOrderDetails pomodel)
        {
            int Result = 0;
            try
            {
                _paytmBo.PurchaseOrderDetailsData(pomodel);
                Result = 1;
            }
            catch (Exception ex)
            {
                Result = 0;

            }
            return Result;
        }
        /// <summary>
        /// Here We pass Data From "InsertPurchaseOrderDetailsData" to this Below Method 
        /// Just For Easy Coding
        /// </summary>
        /// <param name="pomodel">
        /// pomodel
        /// </param>
        /// <returns>
        /// Resul value either 1 or 0 Success/Failure
        /// </returns>
        /// 

        public int TrackingOrderStatusRandomData(TrackingOrderStatus track)
        {
            int Result = 0;
            try
            {
                _paytmBo.TrackingOrderStatusData(track);
                Result = 1;
            }
            catch (Exception ex)
            {
                Result = 0;

            }
            return Result;
        }
    }
}
