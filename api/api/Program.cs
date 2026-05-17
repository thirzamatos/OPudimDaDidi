using api.Data;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//banco
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

builder.Services.AddScoped<AuthService>();

//jwt
var jwtKey = builder.Configuration["Jwt:Key"]!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Pudinho API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Digite: Bearer {seu token}"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Migrations + Seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    if (!db.Products.Any())
    {
        db.Products.AddRange(
            new Product { Nome = "Pudim Tradicional", Sabor = "Tradicional", Tamanho = "120g", Descricao = "O clássico pudim de leite condensado, cremoso e irresistível, com calda dourada de caramelo.", Preco = 9.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim Tradicional", Sabor = "Tradicional", Tamanho = "500g", Descricao = "O clássico pudim de leite condensado, cremoso e irresistível, com calda dourada de caramelo.", Preco = 32.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim Tradicional", Sabor = "Tradicional", Tamanho = "1kg", Descricao = "O clássico pudim de leite condensado, cremoso e irresistível, com calda dourada de caramelo.", Preco = 60.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim de Café", Sabor = "Café", Tamanho = "120g", Descricao = "Pudim aromático com essência de café premium, perfeito para os amantes de um sabor mais intenso.", Preco = 10.00m, ImagemUrl = "/imagens/cafe-pudim.jpeg" },
            new Product { Nome = "Pudim de Café", Sabor = "Café", Tamanho = "500g", Descricao = "Pudim aromático com essência de café premium, perfeito para os amantes de um sabor mais intenso.", Preco = 38.00m, ImagemUrl = "/imagens/cafe-pudim.jpeg" },
            new Product { Nome = "Pudim de Café", Sabor = "Café", Tamanho = "1kg", Descricao = "Pudim aromático com essência de café premium, perfeito para os amantes de um sabor mais intenso.", Preco = 72.00m, ImagemUrl = "/imagens/cafe-pudim.jpeg" },
            new Product { Nome = "Pudim de Doce de Leite", Sabor = "Doce de Leite", Tamanho = "120g", Descricao = "Pudim suave com doce de leite artesanal, uma combinação que derrete na boca.", Preco = 10.00m, ImagemUrl = "/imagens/doce-de-leite-pudim.jpeg" },
            new Product { Nome = "Pudim de Doce de Leite", Sabor = "Doce de Leite", Tamanho = "500g", Descricao = "Pudim suave com doce de leite artesanal, uma combinação que derrete na boca.", Preco = 38.00m, ImagemUrl = "/imagens/doce-de-leite-pudim.jpeg" },
            new Product { Nome = "Pudim de Doce de Leite", Sabor = "Doce de Leite", Tamanho = "1kg", Descricao = "Pudim suave com doce de leite artesanal, uma combinação que derrete na boca.", Preco = 72.00m, ImagemUrl = "/imagens/doce-de-leite-pudim.jpeg" },
            new Product { Nome = "Pudim de Ovomaltine", Sabor = "Ovomaltine", Tamanho = "120g", Descricao = "Pudim cremoso com Ovomaltine, equilibrando o sabor de chocolate e malte de forma única.", Preco = 10.00m, ImagemUrl = "/imagens/chocolate-pudim.jpeg" },
            new Product { Nome = "Pudim de Ovomaltine", Sabor = "Ovomaltine", Tamanho = "500g", Descricao = "Pudim cremoso com Ovomaltine, equilibrando o sabor de chocolate e malte de forma única.", Preco = 38.00m, ImagemUrl = "/imagens/chocolate-pudim.jpeg" },
            new Product { Nome = "Pudim de Ovomaltine", Sabor = "Ovomaltine", Tamanho = "1kg", Descricao = "Pudim cremoso com Ovomaltine, equilibrando o sabor de chocolate e malte de forma única.", Preco = 72.00m, ImagemUrl = "/imagens/chocolate-pudim.jpeg" },
            new Product { Nome = "Pudim Zero Lactose", Sabor = "Zero Lactose", Tamanho = "120g", Descricao = "Todo o sabor do pudim tradicional sem lactose, para você aproveitar sem restrições.", Preco = 10.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim Zero Lactose", Sabor = "Zero Lactose", Tamanho = "500g", Descricao = "Todo o sabor do pudim tradicional sem lactose, para você aproveitar sem restrições.", Preco = 38.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim Zero Lactose", Sabor = "Zero Lactose", Tamanho = "1kg", Descricao = "Todo o sabor do pudim tradicional sem lactose, para você aproveitar sem restrições.", Preco = 72.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim de Chocolate", Sabor = "Chocolate", Tamanho = "120g", Descricao = "Pudim intenso de chocolate com calda aveludada, uma explosão de sabor em cada colherada.", Preco = 10.00m, ImagemUrl = "/imagens/chocolate-pudim.jpeg" },
            new Product { Nome = "Pudim de Chocolate", Sabor = "Chocolate", Tamanho = "500g", Descricao = "Pudim intenso de chocolate com calda aveludada, uma explosão de sabor em cada colherada.", Preco = 38.00m, ImagemUrl = "/imagens/chocolate-pudim.jpeg" },
            new Product { Nome = "Pudim de Chocolate", Sabor = "Chocolate", Tamanho = "1kg", Descricao = "Pudim intenso de chocolate com calda aveludada, uma explosão de sabor em cada colherada.", Preco = 72.00m, ImagemUrl = "/imagens/chocolate-pudim.jpeg" },
            new Product { Nome = "Pudim de Ninho com Ganache de Nutella", Sabor = "Ninho com Nutella", Tamanho = "120g", Descricao = "Pudim de leite Ninho com generosa camada de ganache de Nutella. Sofisticação em cada colherada.", Preco = 12.00m, ImagemUrl = "/imagens/ninho-com-nutella-pudim.jpeg" },
            new Product { Nome = "Pudim de Ninho com Ganache de Nutella", Sabor = "Ninho com Nutella", Tamanho = "500g", Descricao = "Pudim de leite Ninho com generosa camada de ganache de Nutella. Sofisticação em cada colherada.", Preco = 40.00m, ImagemUrl = "/imagens/ninho-com-nutella-pudim.jpeg" },
            new Product { Nome = "Pudim de Ninho com Ganache de Nutella", Sabor = "Ninho com Nutella", Tamanho = "1kg", Descricao = "Pudim de leite Ninho com generosa camada de ganache de Nutella. Sofisticação em cada colherada.", Preco = 77.00m, ImagemUrl = "/imagens/ninho-com-nutella-pudim.jpeg" },
            new Product { Nome = "Pudim de Coco com Cocada Cremosa", Sabor = "Coco com Cocada", Tamanho = "120g", Descricao = "Pudim de coco com cobertura de cocada cremosa artesanal, um sabor tropical inconfundível.", Preco = 12.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim de Coco com Cocada Cremosa", Sabor = "Coco com Cocada", Tamanho = "500g", Descricao = "Pudim de coco com cobertura de cocada cremosa artesanal, um sabor tropical inconfundível.", Preco = 40.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim de Coco com Cocada Cremosa", Sabor = "Coco com Cocada", Tamanho = "1kg", Descricao = "Pudim de coco com cobertura de cocada cremosa artesanal, um sabor tropical inconfundível.", Preco = 77.00m, ImagemUrl = "/imagens/tradicional-pudim.jpeg" },
            new Product { Nome = "Pudim de Chocolate Branco com Geleia de Morango", Sabor = "Chocolate Branco com Morango", Tamanho = "120g", Descricao = "Pudim de chocolate branco com geleia de morango artesanal, uma combinação delicada e irresistível.", Preco = 12.00m, ImagemUrl = "/imagens/chocolate-branco-com-calda-pudim.jpeg" },
            new Product { Nome = "Pudim de Chocolate Branco com Geleia de Morango", Sabor = "Chocolate Branco com Morango", Tamanho = "500g", Descricao = "Pudim de chocolate branco com geleia de morango artesanal, uma combinação delicada e irresistível.", Preco = 40.00m, ImagemUrl = "/imagens/chocolate-branco-com-calda-pudim.jpeg" },
            new Product { Nome = "Pudim de Chocolate Branco com Geleia de Morango", Sabor = "Chocolate Branco com Morango", Tamanho = "1kg", Descricao = "Pudim de chocolate branco com geleia de morango artesanal, uma combinação delicada e irresistível.", Preco = 77.00m, ImagemUrl = "/imagens/chocolate-branco-com-calda-pudim.jpeg" }
        );

        db.SaveChanges();
    }

    if (!db.Users.Any(u => u.Role == "vendedor"))
    {
        var sha256 = System.Security.Cryptography.SHA256.HashData(
            System.Text.Encoding.UTF8.GetBytes("123456")
        );
        db.Users.Add(new User
        {
            Nome = "Didi",
            Email = "didi@pudimdadidi.com",
            SenhaHash = Convert.ToHexString(sha256),
            Role = "vendedor"
        });
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();