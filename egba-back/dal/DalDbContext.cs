using dal.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal
{
    public partial class DalDbContext : DbContext
    {
        public DalDbContext()
        {
        }

        public DalDbContext(DbContextOptions<DalDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Education> Educations { get; set; }
        public virtual DbSet<JoinToEducation> JoinToEducations { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<MarketItem> MarketItems { get; set; }
        public virtual DbSet<Market> Markets { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Turkish_Turkey.1254");

            modelBuilder.Entity<Education>(entity =>
            {
                entity.ToTable("Education");

                entity.HasIndex(e => e.MentorId, "fki_mentor_id_too_education");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('education_seq'::regclass)");

                entity.Property(e => e.FinishDate)
                    .HasColumnType("date")
                    .HasColumnName("finish_date");

                entity.Property(e => e.MentorId).HasColumnName("mentor_id");

                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("start_date");

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("subject");

                entity.HasOne(d => d.Mentor)
                    .WithMany(p => p.Educations)
                    .HasForeignKey(d => d.MentorId)
                    .HasConstraintName("education_mentor_id_fk");
            });

            modelBuilder.Entity<JoinToEducation>(entity =>
            {
                entity.ToTable("JoinToEducation");

                entity.HasIndex(e => e.EducationId, "fki_education_id_fk");

                entity.HasIndex(e => e.UserId, "fki_join_user_id_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('join_edu_seq'::regclass)");

                entity.Property(e => e.EducationId).HasColumnName("education_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Education)
                    .WithMany(p => p.JoinToEducations)
                    .HasForeignKey(d => d.EducationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("education_id_fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.JoinToEducations)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("join_user_id_fk");
            });

            modelBuilder.Entity<Market>(entity =>
            {
                entity.ToTable("Market");

                entity.HasIndex(e => e.UserId, "fki_user_id_to_market_fj");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('market_seq'::regclass)");

                entity.Property(e => e.Description)
                    .HasColumnType("character varying")
                    .HasColumnName("description");

                entity.Property(e => e.FinishDate)
                    .HasColumnType("date")
                    .HasColumnName("finish_date");

                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("start_date");

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("subject");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Markets)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_id_to_market_fj");
            });

            modelBuilder.Entity<MarketItem>(entity =>
            {
                entity.ToTable("MarketItem");

                entity.HasIndex(e => e.MarketId, "fki_marketjoin_id_to_fk");

                entity.HasIndex(e => e.UserId, "fki_user_id_to_market_item");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('market_item_seq'::regclass)");

                entity.Property(e => e.Count).HasColumnName("count");

                entity.Property(e => e.Item)
                    .HasColumnType("character varying")
                    .HasColumnName("item");

                entity.Property(e => e.MarketId).HasColumnName("market_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Market)
                    .WithMany(p => p.MarketItems)
                    .HasForeignKey(d => d.MarketId)
                    .HasConstraintName("market_id_to_market_item");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MarketItems)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_id_to_market_item");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('user_seq'::regclass)");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .HasColumnName("username");
            });

           

            modelBuilder.HasSequence("education_seq");

            OnModelCreatingPartial(modelBuilder);


        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
