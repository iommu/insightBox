// Used from https://gist.github.com/victorsteven
package main

import (
	"fmt"
	"os"

	"github.com/99designs/gqlgen/api"
	"github.com/99designs/gqlgen/codegen/config"
	"github.com/99designs/gqlgen/plugin/modelgen"
)

// Add the gorm tags to the model definition
func addGormTags(b *modelgen.ModelBuild) *modelgen.ModelBuild {
	for _, model := range b.Models {
		for _, field := range model.Fields {
			// Add tags for "Day"
			if model.Name == "Day" && (field.Name == "id" || field.Name == "date") {
				field.Tag += ` gorm:"primary_key"`
			}
			// Add tags for "Words"
			if model.Name == "Words" && (field.Name == "id" || field.Name == "date" || field.Name == "word") {
				field.Tag += ` gorm:"primary_key"`
			}
		}
	}

	return b
}

func main() {
	cfg, err := config.LoadConfigFromDefaultLocations()
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, "failed to load config", err.Error())
		os.Exit(2)
	}

	// Attaching the mutation function onto modelgen plugin
	p := modelgen.Plugin{
		MutateHook: addGormTags,
	}

	err = api.Generate(cfg,
		api.NoPlugins(),
		api.AddPlugin(&p),
	)
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, err.Error())
		os.Exit(3)
	}
}
