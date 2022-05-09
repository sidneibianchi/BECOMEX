using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Entities
{
    public class Country 
    {
        public string Name { get; set; }
        public string Alpha3Code { get; set; }
        public List<Currencies> Currencies { get; set; }
        public Flags Flags { get; set; }
        public List<RegionalBlocs> RegionalBlocs { get; set; }
        public string[] Borders {get;set;}
        public string Population { get; set; }
        public string Region { get; set; }
        public string[] Timezones { get; set; }
        public List<Languages> Languages { get; set; }
        public string Capital { get; set; }

    }
}