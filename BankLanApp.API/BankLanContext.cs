namespace BankLanApp.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using System.Linq;

    public class Kunde
    {
        [Key]
        public string personnummer { get; set; }
        public string tlf { get; set; }
        public string epost { get; set; }
    }

    public class Soknad
    {
        [Key]
        public int soknadID { get; set; }
        public int belop { get; set; }
        public int antall_ar { get; set; }
        public int kostnader { get; set; }
        public string personnummer { get; set; }
        public virtual Kunde kunde { get; set; }
    }

    public class BankLanContext : DbContext
    {
        public DbSet<Kunde> Kunder { get; set; }
        public DbSet<Soknad> Soknader { get; set; }

        public BankLanContext()
            : base("name=BankLanContext")
        {
            Database.CreateIfNotExists();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

    }
}