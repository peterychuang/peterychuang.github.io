module Jekyll
  class EmbedVideo < Liquid::Tag
    @ytid = nil
    @width = ''
    @height = ''

    def initialize(tag_name, markup, tokens)
      if markup =~ /(?:(?:https?:\/\/)?(?:www.youtube.com\/(?:embed\/|watch\?v=)|youtu.be\/)?(\S+)(?:\?rel=\d)?)(?:\s+(\d+)\s(\d+))?/i
        @ytid = $1
        @width = $2 || "560"
        @height = $3 || "315"
      end
      super
    end

    def render(context)
      ouptut = super
      if @ytid
        id = @ytid
        w = @width
        h = @height
        intrinsic = ((h.to_f / w.to_f) * 100)
        padding_bottom = ("%.2f" % intrinsic).to_s  + "%"

        embed = "<div class='embed-container'><iframe src='https://www.youtube.com/embed/#{id}' frameborder='0' allowfullscreen></iframe></div>"

      else
        "Error while processing. Try: {% youtube video_id [width height] %}"
      end
    end
  end
end

    Liquid::Template.register_tag('youtube', Jekyll::EmbedVideo)
