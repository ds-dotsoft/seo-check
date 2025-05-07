# seo-check
A GitHub Action to enforce basic on-page SEO and accessibility:

- ❌ Fails if `<title>` or `<meta name="description">` are missing.  
- ⚠️ Warns (or fails, if enabled) on `<img>` missing `alt`.  
- ❌ Fails if `sitemap.xml` is not present.

## Usage

```yaml
steps:
    - uses: actions/checkout@v4
    - name: Build Action
        run: npm ci && npm run build
    - name: SEO Gate
        uses: dotsoft-org/seo-check-action@v1
        with:
            fail_on_warning: 'true'   # turn warnings into errors
```

Powered by [Dotsoft](https://dotsoft.org/) – the full-stack studio for brands that want to ship faster.  
