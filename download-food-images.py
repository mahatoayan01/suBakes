import urllib.request
import os
import sys

BASE_DIR = os.path.abspath("public/images")

# Curated high-resolution Unsplash food photography images matching each exact dish
IMAGE_MAP = {
    # HERO
    "hero/subakes-wood-fired-hero.jpg": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
    
    # FOOD DISHES
    "food/zesty-chicken-pizza.jpg": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    "food/paneer-piccante-pizza.jpg": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    "food/margherita-wood-fired-pizza.jpg": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    "food/pesto-mushroom-pizza.jpg": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    "food/vegetariana-pizza.jpg": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
    "food/quattro-formaggi-pizza.jpg": "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80",
    "food/bbq-chicken-pizza.jpg": "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80",
    "food/mediterranean-pizza.jpg": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
    "food/cheese-garlic-bread.jpg": "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80",
    "food/cilantro-chicken-crostini.jpg": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    "food/spaghetti-carbonara.jpg": "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
    "food/tiramisu.jpg": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    "food/caramel-dream-cake.jpg": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    "food/fresh-lime-soda.jpg": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    "food/artisan-cold-brew.jpg": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",

    # INTERIOR & EXTERIOR & GALLERY
    "interior/cozy-dining-seating.jpg": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "interior/wood-fired-stone-oven.jpg": "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80",
    "exterior/pizzeria-storefront.jpg": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    "gallery/chef-stretching-dough.jpg": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80",
    "gallery/pizza-oven-embers.jpg": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
    "gallery/fresh-dough-and-basil.jpg": "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80",

    # INSTAGRAM POSTS (6 square tiles)
    "instagram/insta-post-1.jpg": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&h=600&q=80",
    "instagram/insta-post-2.jpg": "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&h=600&q=80",
    "instagram/insta-post-3.jpg": "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&h=600&q=80",
    "instagram/insta-post-4.jpg": "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=600&h=600&q=80",
    "instagram/insta-post-5.jpg": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&h=600&q=80",
    "instagram/insta-post-6.jpg": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&h=600&q=80"
}

def download_images():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    success_count = 0
    total = len(IMAGE_MAP)
    
    for rel_path, url in IMAGE_MAP.items():
        dest_path = os.path.join(BASE_DIR, rel_path)
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as response:
                content = response.read()
                if len(content) > 1000:
                    with open(dest_path, 'wb') as f:
                        f.write(content)
                    print(f"Downloaded ({len(content)//1024} KB): {rel_path}")
                    success_count += 1
                else:
                    print(f"File too small ({len(content)} bytes): {rel_path}")
        except Exception as e:
            print(f"Failed to download {rel_path}: {e}")

    print(f"\nCompleted: {success_count}/{total} images downloaded successfully!")

if __name__ == "__main__":
    download_images()
