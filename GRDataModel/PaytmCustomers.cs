using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataModel
{
    //PaytmCustomers
    public class PaytmCustomers
    {
        public int PaytmCustomersId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string DOB { get; set; }
        public string DateofAccount { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }

    //NewUserRegistration
    public class NewUserRegistration
    {
        public string UserName { get; set; }
        public string Mobile { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
    }

    /// <summary>
    /// this model is used to store orderdata
    /// </summary>
    public class PurchaseOrder
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
        public int POBackStatus { get; set; }

        public int PinCode { get; set; }
        public string ReceiverName { get; set; }
        public string PrimaryAddress { get; set; }
        public string Area { get; set; }
        public string District { get; set; }
        public string AlterMobileNumber { get; set; }
        public string PaymentDivison { get; set; }
        public int ShippingCharges { get; set; }

    }


    /// <summary>
    /// this model is used to store orderitems data i.e, individual items data
    /// </summary>
    public class PurchaseOrderDetails
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
        public int POBackStatus { get; set; }
        public string POReturnWithInDate { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public string ProductDescription { get; set; }
        public int OrderId { get; set; }
        public int POShipCharge { get; set; }
        public int ProdId { get; set; }
        public int CategoryId { get; set; }

        public string ReceiverName { get; set; }
        public string PrimaryAddress { get; set; }
        public string Area { get; set; }
        public string District { get; set; }
        public string MobileNumber { get; set; }
        public string AlterMobileNumber { get; set; }
        public int PinCode { get; set; }
    }


    /// <summary>
    /// this model is used to checking and processing the status of the shipping item
    /// </summary>
    public class TrackingOrderStatus
    {
        public int Id { get; set; }
        public string POId { get; set; }
        public int POItemId { get; set; }
        public string PODate { get; set; }
        public string POTime { get; set; }
        public string PODeliveryDate { get; set; }
        public string PODeliveryType { get; set; }
        public int POBackStatus { get; set; }
        public string Area { get; set; }
        public int PinCode { get; set; }
        public int ProcConf { get; set; }
        public string ProcConfDate { get; set; }
        public string ProcConfTime { get; set; }
        public int ProcPacked { get; set; }
        public string ProcPackDate { get; set; }
        public string ProcPackTime { get; set; }
        public int ProcDispatched { get; set; }
        public string ProcDispDate { get; set; }
        public string ProcDispTime { get; set; }
        public string ShipBy { get; set; }
        public string ShipDate { get; set; }
        public string ShipTime { get; set; }
        public string ShippingItemId { get; set; }
        public int ProdId { get; set; }
        public int CategoryId { get; set; }
        public int ShippingStatus { get; set; }
        public string DeliveredDate { get; set; }
        public string DeliveredTime { get; set; }
        public int DeliveredStatus { get; set; }
        public string ProcDispatchedFrom { get; set; }
        public string DeliveryArea { get; set; }
    }

    /// <summary>
    /// Use to Use StatusCode information
    /// </summary>
    public enum StatusCode
    {
        Placed = 1,
        Confirmed,
        Packed,
        Dispatched,
        InGoods,
        NearToYou,
        Delivered,
        Cancelled,
        Returned,
        InHold
    }
}
