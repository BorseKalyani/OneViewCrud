//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OneViewCrud.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class record
    {
        public int id { get; set; }
        [Required(ErrorMessage ="Course Name is Required")]
        public string coursename { get; set; }
        [Required(ErrorMessage = "Fee is Required")]
        public Nullable<int> fee { get; set; }
    }
}
