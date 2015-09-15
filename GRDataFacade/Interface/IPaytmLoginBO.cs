using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataModel;
namespace GRDataFacade.Interface
{
    public interface IPaytmLoginBO
    {
        PaytmLogin LoginUser(string UserName, string Password);
        PaytmCustomers ForgetPassword(string Email, string Question, string Answer);
    }
}
