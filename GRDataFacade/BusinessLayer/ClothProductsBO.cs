using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataFacade.Interface;
using GRDataLayer.Contract;
using GRDataLayer.Repository;
using GRDataModel;

namespace GRDataFacade.BusinessLayer
{
    public class ClothProductsBO : IClothProductsBO
    {
        #region Unitof work Ref
        IUnitOfWork _unitOfWork = null;

        public ClothProductsBO(IUnitOfWork GRDBContext)
        {
            this._unitOfWork = GRDBContext;
        }

        public ClothProductsBO()
        {
            this._unitOfWork = new UnitOfWork();
        }
        #endregion Unitof work Ref

        //Inserting New Cloths into Database
        public void InsertNewCloths(ClothProducts cloths)
        {
            _unitOfWork.Repository<ClothProducts>().Insert(cloths);
            _unitOfWork.Save();
        }

        //GetAll cloth Products    
        public List<ClothProducts> GetAllCloths()
        {
            var cloths = _unitOfWork.Repository<ClothProducts>().GetAll().ToList();
            return cloths;
        }
    }

}
