import * as cdk from "aws-cdk-lib";
import {
	CodeBuildStep,
    CodePipeline,
    CodePipelineSource,
    ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { PipelineStage } from "./PipelineStage";
export class CdkCicdStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, "AwesomePipeline", {
            pipelineName: "AwesomePipeline",
            synth: new ShellStep("Synth", {
                input: CodePipelineSource.gitHub(
                    "jerejung/cdk-learning",
                    "cicd-practice"
                ),
                commands: [
					'npm ci',
					'npx cdk synth'
                ]
            }),
        });

		const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
			stageName: 'test'
		}));

		// Test before deployment
		testStage.addPre(new CodeBuildStep('UnitTests', {
			commands: [
				'npm ci',
				'npm test'
			]
		}));
    }
}
