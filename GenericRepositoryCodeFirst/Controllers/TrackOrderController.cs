using GRDataFacade.BusinessLayer;
using GRDataFacade.Interface;
using GRDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using GRDataModel;


namespace GenericRepositoryCodeFirst.Controllers
{
    public class TrackOrderController : Controller
    {
        #region constructor ref
        ITrackOrderBO _TrackOrderBo = null;
        IPaytmCustomersBO _paytmBo = null;
        GRDBContext DBcontext = null;
        PurchaseOrder SessPOmodel = new PurchaseOrder();
        NewUserRegistration SessLogin = new NewUserRegistration();
        public TrackOrderController(ITrackOrderBO _TrackOrderBo, IPaytmCustomersBO _paytmBo, GRDBContext DBcontext)
        {
            this._TrackOrderBo = _TrackOrderBo;
            this._paytmBo = _paytmBo;
            this.DBcontext = DBcontext;

        }

        public TrackOrderController()
        {
            _TrackOrderBo = new TrackOrderBO();
            _paytmBo = new PaytmCustomersBO();
            DBcontext = new GRDBContext();
        }
        #endregion

        /// <summary>
        /// pomodel
        /// </summary>
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
        }


        public class TrackOrder
        {
            public string POId { get; set; }
            public int POItemId { get; set; }
        }

        /// <summary>
        /// This Method is Used to Retrieve PurchaseOrder and PruchaseOrderDetails Data
        /// To display TrackOrder Page information
        /// </summary>
        /// <returns></returns>
        public JsonResult SummeryLiveOrder()
        {
            try
            {
                if ((PurchaseOrder)Session["POModelSession"] != null)
                {
                    PurchaseOrder model = (PurchaseOrder)Session["POModelSession"];
                    string OrderId = model.POId;

                    var Porder = _TrackOrderBo.GetAllPurchaseOrderData();
                    var PorderDetails = _TrackOrderBo.GetAllPurchaseOrderDetailsData();

                    //Retrieve PurchaseOrder table Data
                    var POLiveRecord = from c in Porder where c.POId == OrderId select c;

                    //Retrieve PurchaseOrderDetails table Data
                    var PODLiveRecord = from c in PorderDetails where c.POId == OrderId select c;

                    //create Duplicate var for Passing two more objects data to view
                    var LiveOrderSuccess = new
                    {
                        POLiveRecord = POLiveRecord,
                        PODLiveRecord = PODLiveRecord
                    };

                    return Json(LiveOrderSuccess, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var session = 0;
                    return Json(session, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Set Session using Below method
        /// </summary>
        /// <param name="POrder"></param>
        /// <returns></returns>
        public JsonResult SummeryOrderSession(PurchaseOrder POrder)
        {
            try
            {
                //Assigning Values TO Session 
                SessPOmodel = POrder;
                Session["POModelSession"] = SessPOmodel;
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// This Session is Used to Store "User Login" Information 
        /// </summary>
        /// <param name="POrder"></param>
        /// <returns></returns>
        public JsonResult LoginSession(NewUserRegistration LoginData)
        {
            int Userdata = 0;
            try
            {
                var loginStatus = _paytmBo.GetAllUserRegistration().ToList();

                var UserInfo = (from u in loginStatus where u.EmailId == LoginData.EmailId && u.Password == LoginData.Password select u).FirstOrDefault();

                //Assigning Values TO Session 
                SessLogin = UserInfo;
                Session["LoginUserSession"] = SessLogin;
                Userdata = 1;
                return Json(Userdata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Userdata = 0;
                return Json(Userdata, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Checkling LoginSession is avail or not
        /// </summary>
        /// <returns></returns>
        public NewUserRegistration CheckLoginSession()
        {
            if ((NewUserRegistration)Session["LoginUserSession"] != null)
            {
                NewUserRegistration reg = (NewUserRegistration)Session["LoginUserSession"];
                return reg;
            }
            else
            {
                Session["LoginUserSession"] = null;
                return null;
            }
        }

        /// <summary>
        /// Loading MyOrders ,when Authentication is Done in MyOrderControl page
        /// </summary>
        /// <returns></returns>
        public JsonResult LoadingMyOrdersData()
        {
            try
            {


                NewUserRegistration reg = CheckLoginSession();


                //if (reg.EmailId != null && reg.Password != null)
                //{

                //    string Emailid = reg.EmailId;
                //    var Porder = _TrackOrderBo.GetAllPurchaseOrderData();
                //    var PorderDetails = _TrackOrderBo.GetAllPurchaseOrderDetailsData();

                //    //Retrieve PurchaseOrder table Data
                //    var POLiveRecord = from c in Porder where c.EmailId == Emailid select c;

                //    //Retrieve PurchaseOrderDetails table Data
                //    var PODLiveRecord = from c in PorderDetails where c.EmailId == Emailid select c;

                //    //create Duplicate var for Passing two more objects data to view
                //    var LiveOrderSuccess = new
                //    {
                //        POLiveRecord = POLiveRecord,
                //        PODLiveRecord = PODLiveRecord
                //    };

                //    return Json(LiveOrderSuccess, JsonRequestBehavior.AllowGet);
                //}


                //checking data

                if (reg.EmailId != null && reg.Password != null)
                {

                    string Emailid = reg.EmailId;
                    var PorderDetails = _TrackOrderBo.GetAllPurchaseOrderDetailsData();
                    var TOrderstatus = _TrackOrderBo.GetAllTrackingOrderStatusData();

                    //Retrieve PurchaseOrderDetails table Data
                    var PODLiveRecord = from c in PorderDetails where c.EmailId == Emailid select c;

                    //Create join 
                    var LiveOrderSuccess = (from PD in PODLiveRecord
                                            join TS in TOrderstatus
                                            on PD.POId equals TS.POId
                                            where PD.EmailId == Emailid
                                            select new
                                            {
                                                POId = PD.POId,
                                                PODate = PD.PODate,
                                                POTime = PD.POTime,
                                                EmailId = PD.EmailId,
                                                PODeliveryDate = PD.PODeliveryDate,
                                                PODeliveryType = PD.PODeliveryType,
                                                POShippingVia = PD.POShippingVia,
                                                POItemId = PD.POItemId,
                                                POItemCost = PD.POItemCost,
                                                POItemCount = PD.POItemCount,
                                                POAmount = PD.POAmount,
                                                FilePath = PD.FilePath,
                                                FileName = PD.FileName,
                                                ProductDescription = PD.ProductDescription,
                                                POShipCharge = PD.POShipCharge,
                                                ReceiverName = PD.ReceiverName,
                                                Area = PD.Area,
                                                DeliveredDate = TS.DeliveredDate,
                                                DeliveredArea = TS.DeliveryArea
                                            }).Distinct().ToList();

                    return Json(LiveOrderSuccess, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Retrieve session data to display userinfo in home page
        /// for logout
        /// </summary>
        /// <returns></returns>
        public JsonResult RetrieveLoginSessionData()
        {
            if ((NewUserRegistration)Session["LoginUserSession"] != null)
            {
                NewUserRegistration reg = (NewUserRegistration)Session["LoginUserSession"];
                var LoginSession = new
                {
                    EmailId = reg.EmailId,
                    UserName = reg.UserName,
                    Mobile = reg.Mobile,
                    Password = reg.Password
                };
                return Json(LoginSession, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Session cleared ,when user  Logout from site
        /// </summary>
        /// <returns></returns>
        public JsonResult LogoutUserSession()
        {

            int logout = 0;
            try
            {
                // NewUserRegistration reg = (NewUserRegistration)Session["LoginUserSession"];
                // if (reg.EmailId != null)
                // {
                Session.Clear();
                Session.Abandon();
                Session.RemoveAll();
                //  return Json(reg.UserName, JsonRequestBehavior.AllowGet);
                // }
                //  else
                // {

                return Json(logout, JsonRequestBehavior.AllowGet);
                //  }
            }
            catch (Exception ex)
            {
                logout = 0;
                return Json(logout, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Tracking Current Order Data
        /// i.e this method os only retreving Orderdata lessthan to Delivery Date
        /// </summary>
        /// <returns></returns>
        public JsonResult RetrevingLiveOrdersData()
        {
            int Count = 0;
            try
            {
                NewUserRegistration reg = CheckLoginSession();
                DateTime TodayDate = DateTime.Now.Date;

                //DateTime future = Convert.ToDateTime(date).Date;
                //int result = DateTime.Compare(TodayDate, future);

                if (reg != null)
                {
                    string Emailid = reg.EmailId;

                    //Retreving data from purchaseorderdetails Table
                    var PorderDetails = _TrackOrderBo.GetAllPurchaseOrderDetailsData();

                    var PODLiveRecord = from c in PorderDetails
                                        where c.EmailId == Emailid
                                        && DateTime.Compare(TodayDate, Convert.ToDateTime(c.PODeliveryDate).Date) != 1
                                        select c;

                    return Json(PODLiveRecord, JsonRequestBehavior.AllowGet);
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
        /// This method is used to show History of any order by passing poid,poitemid as parameters
        /// //This show only one Record History
        /// </summary>
        /// <param name="POId"></param>
        /// <param name="POItemId"></param>
        /// <returns></returns>
        public JsonResult RetrevingHistoryOrderData(TrackOrder checkinfo)
        {
            int Historycount = 0;
            try
            {
                NewUserRegistration reg = CheckLoginSession();
                if (reg.EmailId != null)
                {

                    var PorderDetails = _TrackOrderBo.GetAllPurchaseOrderDetailsData();
                    var TOrderstatus = _TrackOrderBo.GetAllTrackingOrderStatusData();

                    var Historydata = (from PD in PorderDetails
                                       join TS in TOrderstatus
                                       on PD.POId equals TS.POId
                                       where PD.POId == checkinfo.POId && PD.POItemId == checkinfo.POItemId
                                       select new
                                       {
                                           POId = PD.POId,
                                           POShippingVia = PD.POShippingVia,
                                           PODate = PD.PODate,
                                           PODeliveryDate = PD.PODeliveryDate,
                                           POTime = PD.POTime,
                                           POAmount = PD.POAmount,
                                           ReceiverName = PD.ReceiverName,
                                           MobileNumber = PD.MobileNumber,
                                           PrimaryAddress = PD.PrimaryAddress,
                                           POBackStatus = PD.POBackStatus,
                                           Area = PD.Area,
                                           District = PD.District,
                                           PinCode = PD.PinCode,
                                           FilePath = PD.FilePath,
                                           FileName = PD.FileName,
                                           ProductDescription = PD.ProductDescription,
                                           POItemId = PD.POItemId,
                                           ProcConfDate = TS.ProcConfDate,
                                           ProcConfTime = TS.ProcConfTime,
                                           ProcConf = TS.ProcConf,
                                           ProcPackDate = TS.ProcPackDate,
                                           ProcPackTime = TS.ProcPackTime,
                                           ProcPacked = TS.ProcPacked,
                                           ProcDispDate = TS.ProcDispDate,
                                           ProcDispTime = TS.ProcDispTime,
                                           ProcDispatched = TS.ProcDispatched,
                                           ShipDate = TS.ShipDate,
                                           ShipTime = TS.ShipTime,
                                           ShippingItemId = TS.ShippingItemId,
                                           ShipBy = TS.ShipBy,
                                           ShippingStatus = TS.ShippingStatus,
                                           DeliveredDate = TS.DeliveredDate,
                                           DeliveredTime = TS.DeliveredTime,
                                           DeliveredStatus = TS.DeliveredStatus,
                                           DeliveryArea = TS.DeliveryArea
                                       }).Distinct().ToList();

                    return Json(Historydata, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Historycount = 0;
                    return Json(Historycount, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Historycount = 0;
                return Json(Historycount, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// Tracking OrderStatus of Individual OrderItems by passing POId, ItemId
        /// </summary>
        /// <returns></returns>
        public JsonResult TrackingOrderStatus(TrackOrder checkinfo)
        {
            try
            {
                if (checkinfo.POId != null && checkinfo.POItemId != null)
                {
                    var Orderstatus = _TrackOrderBo.GetTrackingOrderStatusData(checkinfo.POId, checkinfo.POItemId);
                    return Json(Orderstatus, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
