using System.Data.Entity.ModelConfiguration;
using GRDataModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace GRDataLayer.Mappers
{

    //PaytmCustomersMap
    public class PaytmCustomersMap : EntityTypeConfiguration<PaytmCustomers>
    {
        public PaytmCustomersMap()
        {
            //Table Name
            this.ToTable("PaytmCustomers");

            //Primary Key
            this.HasKey(t => t.UserName);
            this.HasKey(t => t.Email);

            //Properties
            this.Property(t => t.UserName).IsRequired().HasMaxLength(20);
            this.Property(t => t.Password).IsRequired().HasMaxLength(12);
            this.Property(t => t.PaytmCustomersId).IsRequired();

            //Tables Mapping
            this.Property(t => t.PaytmCustomersId).HasColumnName("PaytmCustomersId").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.UserName).HasColumnName("UserName");
            this.Property(t => t.Password).HasColumnName("Password");
            this.Property(t => t.Gender).HasColumnName("Gender");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.Mobile).HasColumnName("Mobile");
            this.Property(t => t.Country).HasColumnName("Country");
            this.Property(t => t.State).HasColumnName("State");
            this.Property(t => t.DOB).HasColumnName("DOB");
            this.Property(t => t.DateofAccount).HasColumnName("DateofAccount");
            this.Property(t => t.Question).HasColumnName("Question");
            this.Property(t => t.Answer).HasColumnName("Answer");
        }

    }

    //NewUserRegistrationMap
    public class NewUserRegistrationMap : EntityTypeConfiguration<NewUserRegistration>
    {
        public NewUserRegistrationMap()
        {
            //Table Name
            this.ToTable("NewUserRegistration");

            //Primary Key
            this.HasKey(t => t.Mobile);
            this.HasKey(t => t.EmailId);

            //Properties
            this.Property(t => t.UserName).HasColumnName("UserName");
            this.Property(t => t.Mobile).HasColumnName("Mobile");
            this.Property(t => t.EmailId).HasColumnName("EmailId");
            this.Property(t => t.Password).HasColumnName("Password");
        }
    }

    //PurchaseOrderMap
    public class PurchaseOrderMap : EntityTypeConfiguration<PurchaseOrder>
    {
        public PurchaseOrderMap()
        {
            //Table Name
            this.ToTable("PurchaseOrder");

            //Primary Key
            this.HasKey(t => t.POId);

            //Properties
            this.Property(t => t.POId).HasColumnName("POId");
            this.Property(t => t.PODate).HasColumnName("PODate");
            this.Property(t => t.POTime).HasColumnName("POTime");
            this.Property(t => t.OrderedBy).HasColumnName("OrderedBy");
            this.Property(t => t.MobileNumber).HasColumnName("MobileNumber");
            this.Property(t => t.EmailId).HasColumnName("EmailId");
            this.Property(t => t.PODeliveryDate).HasColumnName("PODeliveryDate");
            this.Property(t => t.POShippingVia).HasColumnName("POShippingVia");
            this.Property(t => t.POShowPrice).HasColumnName("POShowPrice");
            this.Property(t => t.PODeliveryCharge).HasColumnName("PODeliveryCharge");
            this.Property(t => t.POAmount).HasColumnName("POAmount");
            this.Property(t => t.PODeliveryType).HasColumnName("PODeliveryType");
            this.Property(t => t.POBackStatus).HasColumnName("POBackStatus");

            this.Property(t => t.PinCode).HasColumnName("PinCode");
            this.Property(t => t.ReceiverName).HasColumnName("ReceiverName");
            this.Property(t => t.PrimaryAddress).HasColumnName("PrimaryAddress");
            this.Property(t => t.Area).HasColumnName("Area");
            this.Property(t => t.District).HasColumnName("District");
            this.Property(t => t.AlterMobileNumber).HasColumnName("AlterMobileNumber");
            this.Property(t => t.PaymentDivison).HasColumnName("PaymentDivison");
            this.Property(t => t.ShippingCharges).HasColumnName("ShippingCharges");

        }
    }


    //PurchaseOrderDetailsMap
    public class PurchaseOrderDetailsMap : EntityTypeConfiguration<PurchaseOrderDetails>
    {
        public PurchaseOrderDetailsMap()
        {
            //Table Name
            this.ToTable("PurchaseOrderDetails");

            this.HasKey(t => t.OrderId);
            //Properties
            this.Property(t => t.POId).HasColumnName("POId");
            this.Property(t => t.PODate).HasColumnName("PODate");
            this.Property(t => t.POTime).HasColumnName("POTime");
            this.Property(t => t.EmailId).HasColumnName("EmailId");
            this.Property(t => t.PODeliveryDate).HasColumnName("PODeliveryDate");
            this.Property(t => t.PODeliveryType).HasColumnName("PODeliveryType");
            this.Property(t => t.POShippingVia).HasColumnName("POShippingVia");
            this.Property(t => t.POItemId).HasColumnName("POItemId");
            this.Property(t => t.POItemSize).HasColumnName("POItemSize");
            this.Property(t => t.POItemCost).HasColumnName("POItemCost");
            this.Property(t => t.POItemCount).HasColumnName("POItemCount");
            this.Property(t => t.POAmount).HasColumnName("POAmount");
            this.Property(t => t.POBackStatus).HasColumnName("POBackStatus");
            this.Property(t => t.POReturnWithInDate).HasColumnName("POReturnWithInDate");
            this.Property(t => t.FilePath).HasColumnName("FilePath");
            this.Property(t => t.FileName).HasColumnName("FileName");
            this.Property(t => t.ProductDescription).HasColumnName("ProductDescription");
            this.Property(t => t.OrderId).HasColumnName("OrderId");
            this.Property(t => t.POShipCharge).HasColumnName("POShipCharge");
            this.Property(t => t.ProdId).HasColumnName("ProdId");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");


            this.Property(t => t.ReceiverName).HasColumnName("ReceiverName");
            this.Property(t => t.PrimaryAddress).HasColumnName("PrimaryAddress");
            this.Property(t => t.Area).HasColumnName("Area");
            this.Property(t => t.District).HasColumnName("District");
            this.Property(t => t.MobileNumber).HasColumnName("MobileNumber");
            this.Property(t => t.AlterMobileNumber).HasColumnName("AlterMobileNumber");
            this.Property(t => t.PinCode).HasColumnName("PinCode");
        }
    }

    //TrackingOrderStatusMap
    public class TrackingOrderStatusMap : EntityTypeConfiguration<TrackingOrderStatus>
    {
        public TrackingOrderStatusMap()
        {
            //Table Name
            this.ToTable("TrackingOrderStatus");

            this.HasKey(t => t.Id);
            //Properties
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.POId).HasColumnName("POId");
            this.Property(t => t.POItemId).HasColumnName("POItemId");
            this.Property(t => t.PODate).HasColumnName("PODate");
            this.Property(t => t.POTime).HasColumnName("POTime");
            this.Property(t => t.PODeliveryDate).HasColumnName("PODeliveryDate");
            this.Property(t => t.PODeliveryType).HasColumnName("PODeliveryType");
            this.Property(t => t.POBackStatus).HasColumnName("POBackStatus");
            this.Property(t => t.Area).HasColumnName("Area");
            this.Property(t => t.PinCode).HasColumnName("PinCode");
            this.Property(t => t.ProcConf).HasColumnName("ProcConf");
            this.Property(t => t.ProcConfDate).HasColumnName("ProcConfDate");
            this.Property(t => t.ProcConfTime).HasColumnName("ProcConfTime");
            this.Property(t => t.ProcPacked).HasColumnName("ProcPacked");
            this.Property(t => t.ProcPackDate).HasColumnName("ProcPackDate");
            this.Property(t => t.ProcPackTime).HasColumnName("ProcPackTime");
            this.Property(t => t.ProcDispatched).HasColumnName("ProcDispatched");
            this.Property(t => t.ProcDispDate).HasColumnName("ProcDispDate");
            this.Property(t => t.ProcDispTime).HasColumnName("ProcDispTime");
            this.Property(t => t.ShipBy).HasColumnName("ShipBy");
            this.Property(t => t.ShipDate).HasColumnName("ShipDate");
            this.Property(t => t.ShipTime).HasColumnName("ShipTime");
            this.Property(t => t.ShippingItemId).HasColumnName("ShippingItemId");
            this.Property(t => t.ProdId).HasColumnName("ProdId");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");

            this.Property(t => t.ShippingStatus).HasColumnName("ShippingStatus");

            this.Property(t => t.DeliveredDate).HasColumnName("DeliveredDate");
            this.Property(t => t.DeliveredTime).HasColumnName("DeliveredTime");
            this.Property(t => t.DeliveredStatus).HasColumnName("DeliveredStatus");
            this.Property(t => t.ProcDispatchedFrom).HasColumnName("ProcDispatchedFrom");
            this.Property(t => t.DeliveryArea).HasColumnName("DeliveryArea");
        }
    }
}

