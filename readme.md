# stdrice's Personal Site

# Things I use
- [Hugo](https://gohugo.io/): Static site generator
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod): Hugo theme
- [Imager](https://imager.io): Image compressor
- Markdown

# Run
- Install `Hugo`, `git`
- Clone this repo
```
git clone https://github.com/stdrice/stdrice.github.io
cd stdrice.github.io
git submodule update --init --recursive
```
- Run locally
```
cd stdrice.github.io
hugo server
```
- Create new post
```
hugo new posts/<post-name>/index.md # Post
hugo new pages/<post-name>/index.md # Page
hugo new vi/<post-name>/index.md # Vietnamese Post
```
- Compress image
```
imager -f jpeg -i <image> --output-dir <directory>
```
