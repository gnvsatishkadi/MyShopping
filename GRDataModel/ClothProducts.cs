using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataModel
{
    public class ClothProducts
    {
        public string ProductId { get; set; }
        public string ProductType { get; set; }
        public string Category { get; set; }
        public string Material { get; set; }
        public string ProductGender { get; set; }
        public string ProductBrand { get; set; }
        public string ProductColor { get; set; }
        public string NeckType { get; set; }
        public string Sleves { get; set; }
        public string Fit { get; set; }
        public string ClothPath { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public string AddedBy { get; set; }
    }
}
