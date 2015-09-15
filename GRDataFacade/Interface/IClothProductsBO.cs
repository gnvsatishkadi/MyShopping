using GRDataModel;
using System.Collections.Generic;

namespace GRDataFacade.Interface
{
    public interface IClothProductsBO
    {
        void InsertNewCloths(ClothProducts cloths);
        List<ClothProducts> GetAllCloths();
    }
}
