using GRDataModel;
using System.Collections.Generic;

namespace GRDataFacade.Interface
{
    public interface IPaytmCustomersBO
    {
        //PaytmCustomers Data only start 
        List<PaytmCustomers> GetAllPaytmsCus();
        void NewPaytmCus(PaytmCustomers paytm);
        void UpdatePaytmCus(PaytmCustomers paytm);
        void DeletePaytmCus(PaytmCustomers paytm);
        PaytmCustomers GetPaytmCusById(string Username,string Email);

        //PaytmCustomers Data only end 

        //NewUserRegistration Start from Here
        
        //GetAll Data
        List<NewUserRegistration> GetAllUserRegistration();

        //Authentication checking by Username and Passeword
        NewUserRegistration UserLogin(string UserName, string Password);

        //ForgetPassword
        void ForgetPassword(string EmailId);

        //SignUp Method
        void NewSignUp(NewUserRegistration SignUp);

        //Edit UserProfile data
        void EditUserProfileData(NewUserRegistration newdata);
        
        //NewUserRegistration End Here

        //StorePurchaseOrder Value
        void PurchaseOrderData(PurchaseOrder POrder);

        //Store PurchaseOrderDetails Value
        void PurchaseOrderDetailsData(PurchaseOrderDetails PODetails);

        //store TrackingOrderStatus values
        void TrackingOrderStatusData(TrackingOrderStatus Trackingdata);

    }
}
